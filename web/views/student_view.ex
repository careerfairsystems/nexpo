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
    base = [:id, :user_id, :year, :resume_en_url, :resume_sv_url]
    
    data = Nexpo.Support.View.render_object(student, base)
    
    session_applications = student.student_session_applications
    if Ecto.assoc_loaded?(session_applications) do
      session_applications = session_applications
        |> render_many(Nexpo.StudentView, "session_application.json", as: :application)
      Map.put(data, :session_applications, session_applications)
    else
      data
    end
  end
  
  def render("session_application.json", %{application: application}) do
    base = [:id, :motivation, :company, :companyApproved]
    
    Nexpo.Support.View.render_object(application, base)
  end
end
