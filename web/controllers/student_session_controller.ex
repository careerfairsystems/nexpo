defmodule Nexpo.StudentSessionController do
  use Nexpo.Web, :controller
  use Guardian.Phoenix.Controller
  alias Nexpo.{Student, StudentSession}

  def create(conn, %{"student_session" => student_sessions_params, "student_id" => student_id}, _user, _claims) do
    data = Map.put(student_sessions_params, "student_id", student_id)
    student = Repo.get(Student, student_id)
    changeset = student
                |> Ecto.build_assoc(:student_sessions)
                |> StudentSession.changeset(data)

    case Repo.insert(changeset) do
      {:ok, _student_session} ->
        conn
        |> redirect(to: student_path(conn, :show, student))
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def update_me(conn, %{"id" => id,"student_session" => student_sessions_params }, user, _claims) do
    student = Repo.get_by!(Student, %{user_id: user.id})
    case Repo.get_by(StudentSession, %{id: id, student_id: student.id}) do
      nil ->  conn
        |> put_status(400)
        |> render(Nexpo.ErrorView, "400.json")
      session ->
        changeset = StudentSession.changeset(session, student_sessions_params)
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
