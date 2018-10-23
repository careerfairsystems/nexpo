defmodule Nexpo.StudentSessionApplicationController do
  use Nexpo.Web, :controller
  use Guardian.Phoenix.Controller

  alias Nexpo.{Student, Representative, StudentSessionApplication}

  def create(conn, %{"student_session_application" => student_session_applications_params}, user, _claims) do
    student = Repo.get_by!(Student, %{user_id: user.id})

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

  def update_me(conn, %{"id" => id,"student_session_application" => student_session_applications_params }, user, _claims) do
    # case Repo.get_by(Student, %{user_id: user.id}) do
    #   nil -> nil
    #   student ->
    #     case Repo.get_by(StudentSessionApplication, %{id: id, student_id: student.id}) do
    #       nil ->  conn
    #         |> put_status(400)
    #         |> render(Nexpo.ErrorView, "400.json")
    #       application ->
    #         changeset = StudentSessionApplication.student_changeset(application, student_session_applications_params)
    #         case Repo.update(changeset) do
    #           {:ok, appl} ->
    #             render(conn, "show.json", student_session_application: appl)
    #           {:error, changeset} ->
    #             conn
    #             |> put_status(:unprocessable_entity)
    #             |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    #         end
    #     end
    # end
    case Repo.get_by(Representative, %{user_id: user.id}) do
      nil -> nil
      representative ->
        company = Ecto.assoc(representative, :company) |> Repo.one
        case Repo.get_by(StudentSessionApplication, %{id: id, company_id: company.id}) do
          nil ->  conn
            |> put_status(400)
            |> render(Nexpo.ErrorView, "400.json")
          application ->
            changeset = StudentSessionApplication.representative_changeset(application, student_session_applications_params)
            case Repo.update(changeset) do
              {:ok, appl} ->
                render(conn, "show.json", student_session_application: appl)
              {:error, changeset} ->
                conn
                |> put_status(:unprocessable_entity)
                |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
            end
        end
    end
  end

  def delete_me(conn, %{"id" => id}, user, _claims) do
    student = Repo.get_by!(Student, %{user_id: user.id})
    case Repo.get_by(StudentSessionApplication, %{id: id, student_id: student.id}) do
      nil ->  conn
        |> put_status(400)
        |> render(Nexpo.ErrorView, "400.json")
      application -> Repo.delete!(application)
          send_resp(conn, :no_content, "")
    end
  end
end
