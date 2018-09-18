defmodule Nexpo.StudentSessionController do
  use Nexpo.Web, :controller

  alias Nexpo.{Student, StudentSession}

  def create(conn, %{"student_session" => student_sessions_params, "student_id" => student_id}) do
    data = Map.put(student_sessions_params, "student_id", student_id)
    student = Repo.get(Student, student_id)
    changeset = student
                |> Ecto.build_assoc(:student_sessions)
                |> StudentSession.changeset(data)

    case Repo.insert(changeset) do
      {:ok} ->
        conn
        |> redirect(to: student_path(conn, :show, student))
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end
end
