defmodule Nexpo.Statistics do
  use Nexpo.Web, :model
  alias Nexpo.{Student, Company, Repo, StudentSessionApplication }

  embedded_schema do
    field :nbr_searching_students, :integer
    field :nbr_students, :integer
    field :company_stats, {:array, :map}
    field :applications_per_day, :date
    timestamps()
  end

  def getAll() do
    nbr_students_applied = length(Repo.all(
      from student in Student,
      join: appl in assoc(student, :student_session_applications),
      group_by: student.id,
      select: student.id
    ))

    applications_per_day = Repo.all(
      from appl in StudentSessionApplication,
      select: appl.inserted_at
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
        company_stats: company,
        applications_per_day: applications_per_day
      }
  end

end
