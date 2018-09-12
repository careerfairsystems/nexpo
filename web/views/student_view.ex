defmodule Nexpo.StudentView do
  use Nexpo.Web, :view

  def render("index.json", %{students: students}) do
    %{data: render_many(students, Nexpo.StudentView, "student.json")}
  end

  def render("show.json", %{student: student}) do
    %{data: render_one(student, Nexpo.StudentView, "student.json")}
  end

  def render("student.json", %{student: student}) do
    %{id: student.id,
      user_id: student.user_id,
      year: student.year,
      resumeEnUrl: student.resumeEnUrl,
      resumeSvUrl: student.resumeSvUrl}
  end
end
