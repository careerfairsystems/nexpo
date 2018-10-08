defmodule Nexpo.StudentController do
  use Nexpo.Web, :controller
  use Guardian.Phoenix.Controller

  alias Nexpo.Student
  alias Nexpo.{CvSv, CvEn}
  alias Guardian.Plug.{EnsurePermissions}

  plug EnsurePermissions, [handler: Nexpo.SessionController,
                           one_of: [%{default: ["read_all"]},
                                    %{default: ["read_users"]}]
                          ] when action in [:index, :show]
  plug EnsurePermissions, [handler: Nexpo.SessionController,
                           one_of: [%{default: ["write_all"]},
                                    %{default: ["write_users"]}]
                          ] when action in [:create, :update, :delete]

  def index(conn, %{}, _user, _claims) do
    students = Repo.all(Student)
    render(conn, "index.json", students: students)
  end

  def create(conn, %{"student" => student_params}, _user, _claims) do
    changeset = Student.changeset(%Student{}, student_params)

    case Repo.insert(changeset) do
      {:ok, student} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", student_path(conn, :show, student))
        |> render("show.json", student: student)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}, _user, _claims) do
    student = Student
        |> Repo.get!(id)
        |> Repo.preload(:student_sessions)
        |> Repo.preload(:student_session_applications)
    render(conn, "show.json", student: student)
  end

  def update(conn, %{"id" => id, "student" => student_params}, _user, _claims ) do
    student = Repo.get!(Student, id)
    changeset = Student.changeset(student, student_params)

    case Repo.update(changeset) do
      {:ok, student} ->
        render(conn, "show.json", student: student)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
      end
    end


  def update_student(conn, %{"student" => student_params}, user, _claims) do
    student = Repo.get_by!(Student, %{user_id: user.id})
    changeset = Student.changeset(student, student_params)
    Map.keys(changeset.changes)
      |> Enum.filter(fn attr -> attr == :resume_sv_url or attr == :resume_en_url end)
      |> Enum.each(fn cv -> update_cv(student, changeset, cv) end)
    case Repo.update(changeset) do
      {:ok, student} ->
        render(conn, "show.json", student: student)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}, _user, _claims) do
    student = Repo.get!(Student, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(student)

    send_resp(conn, :no_content, "")
  end

  defp update_cv(student, changeset, cv) do
    cv_file = Map.get(student, cv)
    # This means that we recently sent null to indicate file removal
    if Map.get(changeset, cv) == nil and  cv_file != nil do
      case cv do
        :resume_sv_url -> CvSv.delete({cv_file, student})
        :resume_en_url -> CvEn.delete({cv_file, student})
      end
    end
  end
end
