defmodule Nexpo.StudentSessionView do
  use Nexpo.Web, :view

  def render("index.json", %{student_sessions: student_sessions}) do
    %{data: render_many(student_sessions, Nexpo.StudentSessionView, "student_session.json")}
  end

  def render("show.json", %{student_session: student_session}) do
    %{data: render_one(student_session, Nexpo.StudentSessionView, "student_session.json")}
  end

  def render("student_session.json", %{student_session: student_session}) do
    # Define own parameters to keep
    base = [:id, :company_id, :student_id, :student_confirmed]

    Nexpo.Support.View.render_object(student_session, base)
  end
end
