defmodule Nexpo.StudentSessionApplicationController do
  use Nexpo.Web, :controller
  use Guardian.Phoenix.Controller

  alias Nexpo.{Student, StudentSessionApplication}

  def create(conn, %{"student_session_application" => student_session_applications_params}, user, _claims) do
    student = Repo.preload(user, :student)
              |> Ecto.assoc(:student)
              |> Repo.one

    data = Map.put(student_session_applications_params, "student_id", student.id)
    changeset = student
                |> Ecto.build_assoc(:student_session_applications)
                |> StudentSessionApplication.changeset(data)

    case Repo.insert(changeset) do
      {:ok, _application} ->
        conn
        |> redirect(to: user_path(conn, :show_me, %{}))
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end
end
