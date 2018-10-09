defmodule Nexpo.StudentSessionApplicationView do
  use Nexpo.Web, :view

  def render("index.json", %{student_session_applications: student_session_applications}) do
    %{data: render_many(student_session_applications, Nexpo.StudentSessionApplicationView, "student_session_application.json")}
  end

  def render("show.json", %{student_session_application: student_session_application}) do
    %{data: render_one(student_session_application, Nexpo.StudentSessionApplicationView, "student_session_application.json")}
  end

  def render("student_session_application.json", %{student_session_application: student_session_application}) do
    # Define own parameters to keep
    base = [:id, :motivation, :company_id, :student_id, :companyApproved, :studentConfirmed]

    Nexpo.Support.View.render_object(student_session_application, base)
  end
end
