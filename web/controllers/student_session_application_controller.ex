defmodule Nexpo.StudentSessionApplicationController do
  use Nexpo.Web, :controller

  alias Nexpo.{Student, StudentSessionApplication}

  def create(conn, %{"student_session_application" => student_session_applications_params}, user, _claims) do
    user = user | Repo.preload(:student)
    student = user.student

    data = Map.put(student_session_applications_params, "student_id", student.id)
    student = Repo.get(Student, student.id)
    changeset = student
                |> Ecto.build_assoc(:student_session_applications)
                |> StudentSessionApplication.changeset(data)

    case Repo.insert(changeset) do
      {:ok, _application} ->
        conn
        |> redirect(to: student_path(conn, :show, student))
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end
end
