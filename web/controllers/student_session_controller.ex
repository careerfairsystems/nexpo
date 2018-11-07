defmodule Nexpo.StudentSessionController do
  use Nexpo.Web, :controller
  use Guardian.Phoenix.Controller

  alias Nexpo.Repo
  alias Nexpo.{Student, Company, StudentSession}
  alias Nexpo.StudentSessionTimeSlot, as: TimeSlot
  alias Guardian.Plug.{EnsurePermissions}

  plug EnsurePermissions, [handler: Nexpo.SessionController,
                           one_of: [%{default: ["read_all"]},
                                    %{default: ["read_companies"]}]
                          ] when action in [:show_reserves]

  plug EnsurePermissions, [handler: Nexpo.SessionController,
                           one_of: [%{default: ["write_all"]},
                                    %{default: ["write_companies"]}]
                          ] when action in [:create, :create_bulk, :delete]

  def create(conn, %{"student_session" => student_sessions_params}, _user, _claims) do
    company = Repo.get(Company, student_sessions_params["company_id"])
    time_slot = Repo.get(TimeSlot, student_sessions_params["student_session_time_slot_id"])

    student = Repo.one(
      from appl in Ecto.assoc(company, :student_session_applications),
      join: student in assoc(appl, :student),
      where: not is_nil(appl.score) and appl.score > 0,
      order_by: [desc: appl.score, asc: student.id],
      # Check that student does not already have session with given company
      left_join: co_session in StudentSession,
      on: student.id == co_session.student_id and co_session.company_id == ^company.id,
      where: is_nil(co_session.id),
      # Check that student does not already have session at the time of the given time slot
      left_join: session in assoc(student, :student_sessions),
      left_join: slot in TimeSlot,
      on: slot.id == session.student_session_time_slot_id and
          slot.start == ^time_slot.start and slot.end == ^time_slot.end,
      where: is_nil(slot.id),
      limit: 1,
      select: student)

    case student do
      nil -> conn
        |> put_status(404)
        |> render(ErrorView, "404.json")
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
    company = Repo.get(Company, student_sessions_params["company_id"])

    time_slots = Repo.all(
      from slot in Ecto.assoc(company, :student_session_time_slots),
      left_join: session in assoc(slot, :student_session),
      where: is_nil(session.id) or session.student_confirmed != true)

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

    case students do
      [] -> conn
        |> put_status(404)
        |> render(Nexpo.ErrorView, "404.json")

      students ->
        delete_bulk = time_slots
        |> Repo.preload(:student_session)
        |> Enum.filter(fn time_slot -> not is_nil(time_slot.student_session) end)
        |> Enum.map(fn time_slot ->
          Repo.get!(StudentSession, time_slot.student_session.id)
        end)
        |> Enum.with_index()
        |> Enum.reduce(Ecto.Multi.new(), fn ({changeset, index}, multi) ->
          Ecto.Multi.delete(multi, Integer.to_string(index), changeset)
        end)

        insert_bulk = students
        |> Enum.reduce({[], Enum.shuffle(time_slots)}, fn student, {acc, slots} ->
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
            nil -> conn
              |> put_status(404)
              |> render(Nexpo.ErrorView, "404.json")
            index ->
              {time_slot, new_slots} = List.pop_at(slots, index)
              data = student_sessions_params
              |> Map.put("student_session_time_slot_id", time_slot.id)
              |> Map.put("student_id", student.id)

              new_acc = [StudentSession.changeset(%StudentSession{}, data) | acc]
              {new_acc, new_slots}
          end
        end)
        |> elem(0)
        |> Enum.with_index()
        |> Enum.reduce(Ecto.Multi.new(), fn ({changeset, index}, multi) ->
          Ecto.Multi.insert(multi, Integer.to_string(index + length(delete_bulk.operations)), changeset)
        end)

        result = delete_bulk
        |> Ecto.Multi.append(insert_bulk)
        |> Repo.transaction

        case result do
          {:ok, _} ->
            conn
            |> put_status(303) # Status Code 303 See Other, that uses GET
            |> redirect(to: company_path(conn, :show, company))
          {:error, _, changeset, _ } ->
            conn
            |> put_status(:unprocessable_entity)
            |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
        end
    end
  end

  def show_reserves(conn, %{}, _user, _claims) do
    reserves = Repo.all(from(
      company in Company,
      join: appl in assoc(company, :student_session_applications),
      join: student in assoc(appl, :student),
      join: user in assoc(student, :user),
      where: not is_nil(appl.score) and appl.score > 0,
      order_by: [desc: appl.score, asc: student.id],
      # Check that student does not already have session with given company
      left_join: session in StudentSession,
      on: student.id == session.student_id and session.company_id == company.id,
      where: is_nil(session.id),
      preload: [student_session_applications: {appl, student: {student, user: user}}]
    ))
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

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(session)

    send_resp(conn, :no_content, "")
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
