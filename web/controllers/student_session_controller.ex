defmodule Nexpo.StudentSessionController do
  use Nexpo.Web, :controller
  use Guardian.Phoenix.Controller

  alias Nexpo.Repo
  alias Nexpo.{Student, Company, StudentSession}
  alias Nexpo.{Email, Mailer}
  alias Nexpo.StudentSessionTimeSlot, as: TimeSlot
  alias Guardian.Plug.{EnsurePermissions}

  plug(
    EnsurePermissions,
    [
      handler: Nexpo.SessionController,
      one_of: [%{default: ["read_all"]}, %{default: ["read_sessions"]}]
    ]
    when action in [:show_reserves, :show_all]
  )

  plug(
    EnsurePermissions,
    [
      handler: Nexpo.SessionController,
      one_of: [%{default: ["write_all"]}, %{default: ["write_sessions"]}]
    ]
    when action in [:create, :create_bulk, :delete]
  )

  def create(conn, %{"student_session" => student_sessions_params}, _user, _claims) do
    company = Repo.get(Company, student_sessions_params["company_id"])
    student = Repo.get(Student, student_sessions_params["student_id"])
    time_slot = Repo.get(TimeSlot, student_sessions_params["student_session_time_slot_id"])

    case Student.is_available?(student, time_slot) do
      false ->
        conn
        |> put_status(404)
        |> render(Nexpo.ErrorView, "404.json")

      true ->
        data = Map.put(student_sessions_params, "student_id", student.id)
        changeset = StudentSession.changeset(%StudentSession{}, data)

        case Repo.insert(changeset) do
          {:ok, _student_session} ->
            conn
            |> redirect(to: company_path(conn, :show, company))

          {:error, changeset} ->
            conn
            |> put_status(:unprocessable_entity)
            |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
        end
    end
  end

  def create_bulk(conn, %{}, _user, _claims) do
    Company.get_available()
    |> Enum.shuffle()
    |> Enum.each(fn company ->
      time_slots = TimeSlot.get_available(company)
      students = Student.get_available(company, time_slots)

      if not Enum.empty?(students) do
        result =
          students
          |> greedy_assign(time_slots, company, 5)
          |> Enum.with_index()
          |> Enum.reduce(Ecto.Multi.new(), fn {changeset, index}, multi ->
            Ecto.Multi.insert(multi, Integer.to_string(index), changeset)
          end)
          |> Repo.transaction()

        with {:error, _, changeset, _} <- result do
          conn
          |> put_status(:unprocessable_entity)
          |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
        end
      end
    end)

    student_sessions = Repo.all(StudentSession)

    student_sessions
    |> Enum.uniq_by(& &1.student_id)
    |> Repo.preload(student: [:user])
    |> Enum.map(& &1.student.user)
    |> Enum.each(&(Email.student_session(&1) |> Mailer.deliver_later()))

    render(conn, "index.json", student_sessions: student_sessions)
  end

  defp greedy_assign(_students, _time_slots, _company, tries) when tries <= 0 do
    []
  end

  defp greedy_assign(students, time_slots, company, tries) when tries > 0 do
    case get_student_sessions(students, time_slots, company) do
      [] -> greedy_assign(students, time_slots, company, tries - 1)
      sessions -> sessions
    end
  end

  defp get_student_sessions(students, time_slots, company) do
    Enum.reduce(students, {[], Enum.shuffle(time_slots)}, fn student, {acc, slots} ->
      case Enum.find_index(slots, fn time_slot -> Student.is_available?(student, time_slot) end) do
        nil ->
          {acc, slots}

        index ->
          {time_slot, new_slots} = List.pop_at(slots, index)

          data = %{
            student_session_time_slot_id: time_slot.id,
            student_id: student.id,
            company_id: company.id
          }

          new_acc = [StudentSession.changeset(%StudentSession{}, data) | acc]
          {new_acc, new_slots}
      end
    end)
    |> elem(0)
  end

  def show_reserves(conn, %{}, _user, _claims) do
    reserves =
      StudentSession.get_reserves()
      |> IO.inspect()
      |> Enum.map(fn company ->
        reserve =
          company.student_session_applications
          |> Enum.map(fn appl ->
            ~s"""
            #{appl.student.user.first_name} #{appl.student.user.last_name},\
            #{appl.student.user.email},\
            #{appl.student.user.phone_number}\
            """
          end)
          |> Enum.take(6)
          |> Enum.join("\n")

        ~s"""
        #{company.name}
        name,email,phone number
        #{reserve}

        """
      end)

    conn |> send_resp(200, reserves)
  end

  defp format_time(naive_date_time) do
    String.pad_leading(Integer.to_string(naive_date_time.hour), 2, "0") <>
      ":" <>
      String.pad_leading(Integer.to_string(naive_date_time.minute), 2, "0")
  end

  def show_all(conn, %{}, _user, _claims) do
    info =
      Company
      |> Repo.all()
      |> Enum.filter(&(&1.student_session_days > 0))
      |> Repo.preload(student_sessions: [:student_session_time_slot, student: [:user]])
      |> Enum.map(fn company ->
        company.student_sessions
        |> Enum.sort_by(& &1.student_session_time_slot.start)
        |> Enum.map(fn session ->
          ~s"""
          #{company.name},\
          #{session.student_session_time_slot.start.day},\
          #{format_time(session.student_session_time_slot.start)},\
          #{format_time(session.student_session_time_slot.end)},\
          #{session.student_session_time_slot.location},\
          #{session.student.user.first_name} #{session.student.user.last_name},\
          #{session.student.user.email},\
          #{session.student.user.phone_number}\
          """
        end)
        |> Enum.join("\n")
      end)
      |> Enum.join("\n\n")

    conn
    |> send_resp(
      200,
      "company_name,session_day,session_start,session_end,session_location,student_name,student_email,student_phone_number\n" <>
        info
    )
  end

  def delete(conn, %{"id" => id}, _user, _claims) do
    session = Repo.get!(StudentSession, id)
    company = Repo.get(Company, session.company_id)
    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(session)

    conn
    |> put_status(303)
    |> redirect(to: company_path(conn, :show, company))
  end

  def delete_bulk(conn, %{}, _user, _claims) do
    time_slots = TimeSlot.get_available_and_non_confirmed()

    result =
      time_slots
      |> Repo.preload(:student_session)
      |> Enum.filter(fn time_slot -> not is_nil(time_slot.student_session) end)
      |> Enum.map(fn time_slot ->
        Repo.get!(StudentSession, time_slot.student_session.id)
      end)
      |> Enum.with_index()
      |> Enum.reduce(Ecto.Multi.new(), fn {changeset, index}, multi ->
        Ecto.Multi.delete(multi, Integer.to_string(index), changeset)
      end)
      |> Repo.transaction()

    case result do
      {:ok, _} ->
        conn
        # Status Code 303 See Other, that uses GET
        |> put_status(303)
        |> redirect(to: company_path(conn, :index))

      {:error, _, changeset, _} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def update_me(conn, %{"id" => id, "student_session" => student_sessions_params}, user, _claims) do
    student = Repo.get_by!(Student, %{user_id: user.id})

    case Repo.get_by(StudentSession, %{id: id, student_id: student.id}) do
      nil ->
        conn
        |> put_status(400)
        |> render(Nexpo.ErrorView, "400.json")

      session ->
        status = student_sessions_params |> Map.get("student_session_status")

        if status != nil and status > session.student_session_status do
          changeset = StudentSession.student_changeset(session, student_sessions_params)

          case Repo.update(changeset) do
            {:ok, sess} ->
              render(conn, "show.json", student_session: sess)

            {:error, changeset} ->
              conn
              |> put_status(:unprocessable_entity)
              |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
          end
        else
          conn
          |> put_status(400)
          |> render(Nexpo.ErrorView, "400.json")
        end
    end
  end
end
