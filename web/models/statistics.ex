defmodule Nexpo.Statistics do
  use Nexpo.Web, :model
  alias Nexpo.{Student, Company, Repo, StudentSessionApplication }

  embedded_schema do
    field :nbr_searching_students, :integer, virtual: true
    field :nbr_students, :integer, virtual: true
    field :nbr_applications, :integer, virtual: true
    field :company_stats, {:array, :map}, virtual: true
    timestamps()
  end

  def getAll() do
    nbr_students_applied = length(Repo.all(
      from student in Student,
      join: appl in assoc(student, :student_session_applications),
      group_by: student.id,
      select: student.id
    ))
    nbr_applications = Repo.one(
      from appl in StudentSessionApplication,
      select: count(appl.id)
    )
    nbr_students = Repo.one(
      from student in Student,
      select: count(student.id)
    )
    # Fetch all companies with student session days and count their applications
    company = (Repo.all(
      from company in Company,
      where: company.student_session_days != 0,
      left_join: appl in assoc(company, :student_session_applications),
      group_by: company.id,
      select: %{id: company.id, name: company.name, nbr_applications: count(appl.id)}
    ))

     %{
        nbr_searching_students: nbr_students_applied,
        nbr_students: nbr_students,
        nbr_applications: nbr_applications,
        company_stats: company
      }
  end

end
