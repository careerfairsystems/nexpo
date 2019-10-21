defmodule Nexpo.NewStudentController do
  use Nexpo.Web, :controller

  alias Nexpo.User
  alias Nexpo.Student

  def new(conn, _params) do
    changeset = User.full_signup_changeset(%User{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"user" => user_params}) do
    %User{}
    |> User.full_signup_changeset(user_params)
    |> Repo.insert()
    |> case do
      {:ok, user} ->
        conn
        |> put_flash(:info, "#{user.first_name} created!")
        |> render("index.html")

      {:error, changeset} ->
        conn
        |> put_flash(:error, "your form had errors")
        |> render("new.html", changeset: changeset)
    end
  end

  # def create(conn, %{"new_student" => new_student_params}) do
  # case Example.create_new_student(new_student_params) do
  # {:ok, new_student} ->
  # conn
  # |> put_flash(:info, "New student created successfully.")
  # |> redirect(to: new_student_path(conn, :show, new_student))
  #
  # # {:error, %Ecto.Changeset{} = changeset} ->
  # render(conn, "new.html", changeset: changeset)
  # # end
  # end
  #
  # def show(conn, %{"id" => id}) do
  # new_student = Example.get_new_student!(id)
  # render(conn, "show.html", new_student: new_student)
  # end
  #
  # def edit(conn, %{"id" => id}) do
  # new_student = Example.get_new_student!(id)
  # changeset = Example.change_new_student(new_student)
  # render(conn, "edit.html", new_student: new_student, changeset: changeset)
  # end

  # def update(conn, %{"id" => id, "new_student" => new_student_params}) do
  # new_student = Example.get_new_student!(id)
  # #
  # case Example.update_new_student(new_student, new_student_params) do
  # {:ok, new_student} ->
  # # conn
  # |> put_flash(:info, "New student updated successfully.")
  # |> redirect(to: new_student_path(conn, :show, new_student))
  #
  # {:error, %Ecto.Changeset{} = changeset} ->
  # render(conn, "edit.html", new_student: new_student, changeset: changeset)
  # end
  # end
  #
  # def delete(conn, %{"id" => id}) do
  # new_student = Example.get_new_student!(id)
  # # {:ok, _new_student} = Example.delete_new_student(new_student)
  # #
  # conn
  # # |> put_flash(:info, "New student deleted successfully.")
  # |> redirect(to: new_student_path(conn, :index))
end

# end
