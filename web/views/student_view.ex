defmodule Nexpo.StudentView do
  use Nexpo.Web, :view

  def render("index.json", %{students: students}) do
    %{data: render_many(students, Nexpo.StudentView, "student.json")}
  end

  def render("show.json", %{student: student}) do
    %{data: render_one(student, Nexpo.StudentView, "student.json")}
  end

  def render("student.json", %{student: student}) do
    # Define own parameters to keep
    base = [:id, :user_id, :year, :resume_en_url, :resume_sv_url, :master, :linked_in]

    Nexpo.Support.View.render_object(student, base)
  end
end
