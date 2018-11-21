defmodule Nexpo.StudentSessionController do
  use Nexpo.Web, :controller
  use Guardian.Phoenix.Controller

  alias Nexpo.Repo
  alias Nexpo.{Student, Company, StudentSession}
  alias Nexpo.StudentSessionTimeSlot, as: TimeSlot
  alias Guardian.Plug.{EnsurePermissions}

  plug EnsurePermissions, [handler: Nexpo.SessionController,
                           one_of: [%{default: ["read_all"]},
                                    %{default: ["read_sessions"]}]
                          ] when action in [:show_reserves]

  plug EnsurePermissions, [handler: Nexpo.SessionController,
                           one_of: [%{default: ["write_all"]},
                                    %{default: ["write_sessions"]}]
                          ] when action in [:create, :create_bulk, :delete]

  def create(conn, %{"student_session" => student_sessions_params}, _user, _claims) do
    company = Repo.get(Company, student_sessions_params["company_id"])
    student = Repo.get(Student, student_sessions_params["student_id"])

    case student do
      nil -> conn
        |> put_status(404)
        |> render(Nexpo.ErrorView, "404.json")
      student ->
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

  def create_bulk(conn, %{"student_sessions" => student_sessions_params}, _user, _claims) do
    Repo.all(
      from company in Company,
      join: slot in assoc(company, :student_session_time_slots),
      group_by: company.id)
    |> Enum.each(fn company ->
      time_slots = Repo.all(
        from slot in Ecto.assoc(company, :student_session_time_slots),
        left_join: session in assoc(slot, :student_session),
        where: is_nil(session.id))

      student_ids = Repo.all(
        from appl in Ecto.assoc(company, :student_session_applications),
        join: student in assoc(appl, :student),
        where: not is_nil(appl.score) and appl.score > 0,
        order_by: [desc: appl.score, asc: student.id],
        # Check that student does not already have session with given company
        left_join: session in StudentSession,
        on: student.id == session.student_id and session.company_id == ^company.id,
        where: is_nil(session.id),
        limit: ^length(time_slots),
        select: student.id)

      students = Repo.all(
        from student in Student,
        where: student.id in ^student_ids,
        left_join: session in assoc(student, :student_sessions),
        group_by: student.id,
        order_by: count(session.id),
        select: student)

      if not Enum.empty?(students) do
          result = students
          |> greedy_assign(time_slots, company, 5)
          |> Enum.with_index()
          |> Enum.reduce(Ecto.Multi.new(), fn ({changeset, index}, multi) ->
            Ecto.Multi.insert(multi, Integer.to_string(index), changeset)
          end)
          |> Repo.transaction

          with {:error, _, changeset, _ } <- result do
            conn
            |> put_status(:unprocessable_entity)
            |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
          end
      end
    end)

    student_sessions = Repo.all(StudentSession)
    render(conn, "index.json", student_sessions: student_sessions)
  end

  defp greedy_assign(students, time_slots, company, tries) when tries <= 0 do [] end
  defp greedy_assign(students, time_slots, company, tries) when tries > 0 do
    case get_student_sessions(students, time_slots, company) do
      [] -> greedy_assign(students, time_slots, company, tries - 1)
      sessions -> sessions
    end
  end

  defp get_student_sessions(students, time_slots, company) do
    Enum.reduce(students, {[], Enum.shuffle(time_slots)}, fn student, {acc, slots} ->
      case Enum.find_index(slots, fn time_slot ->
        case Repo.all(
          from session in Ecto.assoc(student, :student_sessions),
          # Check that student does not already have session at the time of the given time slot
          left_join: slot in TimeSlot,
          on: slot.id == session.student_session_time_slot_id and
              slot.start == ^time_slot.start and slot.end == ^time_slot.end,
          where: not is_nil(slot.id),
          select: slot
        ) do
          [] -> true
          _ -> false
        end
      end) do
        nil -> {[], []}
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
    reserves = StudentSession.get_reserves()
    |> Enum.map(fn company ->
        reserve = company.student_session_applications
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
    time_slots = Repo.all(
      from slot in TimeSlot,
      left_join: session in assoc(slot, :student_session),
      where: is_nil(session.id) or session.student_confirmed != true)

    result = time_slots
    |> Repo.preload(:student_session)
    |> Enum.filter(fn time_slot -> not is_nil(time_slot.student_session) end)
    |> Enum.map(fn time_slot ->
      Repo.get!(StudentSession, time_slot.student_session.id)
    end)
    |> Enum.with_index()
    |> Enum.reduce(Ecto.Multi.new(), fn ({changeset, index}, multi) ->
      Ecto.Multi.delete(multi, Integer.to_string(index), changeset)
    end)
    |> Repo.transaction

    case result do
      {:ok, _} ->
        conn
        |> put_status(303) # Status Code 303 See Other, that uses GET
        |> redirect(to: company_path(conn, :index))
      {:error, _, changeset, _ } ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def update_me(conn, %{"id" => id,"student_session" => student_sessions_params }, user, _claims) do
    student = Repo.get_by!(Student, %{user_id: user.id})
    case Repo.get_by(StudentSession, %{id: id, student_id: student.id}) do
      nil -> conn
        |> put_status(400)
        |> render(Nexpo.ErrorView, "400.json")
      session ->
        changeset = StudentSession.student_changeset(session, student_sessions_params)
        case Repo.update(changeset) do
          {:ok, sess} ->
            render(conn, "show.json", student_session: sess)
          {:error, changeset} ->
            conn
            |> put_status(:unprocessable_entity)
            |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
        end
    end
  end
end
