defmodule Nexpo.StudentSessionController do
  use Nexpo.Web, :controller
  use Guardian.Phoenix.Controller

  alias Nexpo.{Student, Company, StudentSession}
  alias Nexpo.StudentSessionTimeSlot, as: TimeSlot
  alias Guardian.Plug.{EnsurePermissions}

  plug EnsurePermissions, [handler: Nexpo.SessionController,
                           one_of: [%{default: ["write_all"]},
                                    %{default: ["write_companies"]}]
                          ] when action in [:create]

  def create(conn, %{"student_session" => student_sessions_params}, _user, _claims) do
    company = Repo.get(Company, student_sessions_params["company_id"])
    time_slot = Repo.get(TimeSlot, student_sessions_params["student_session_time_slot_id"])

    student = Repo.one(from(
      appl in Ecto.assoc(company, :student_session_applications),
      join: student in assoc(appl, :student),
      order_by: [desc: appl.score, asc: student.id],
      left_join: session in StudentSession,
      on: student.id == session.student_id and session.company_id == ^company.id,
      left_join: slot in assoc(session, :student_session_time_slot),
      where: is_nil(slot.id) or slot.company_id != ^company.id,
      limit: 1,
      select: student))

    prev_session = Ecto.assoc(time_slot, :student_session) |> Repo.one
    if prev_session do
      Repo.delete!(prev_session)
    end

    case student do
      nil -> conn
        |> redirect(to: company_path(conn, :show, company))
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

  def update_me(conn, %{"id" => id,"student_session" => student_sessions_params }, user, _claims) do
    student = Repo.get_by!(Student, %{user_id: user.id})
    case Repo.get_by(StudentSession, %{id: id, student_id: student.id}) do
      nil ->  conn
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
