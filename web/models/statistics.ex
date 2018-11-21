defmodule Nexpo.Statistics do
  use Nexpo.Web, :model
  alias Nexpo.{Student, Company, Repo, StudentSessionApplication }

  embedded_schema do
    field :nbr_searching_students, :integer
    field :nbr_students, :integer
    field :company_stats, {:array, :map}
    field :applications_per_day, :date
    field :words_per_appl, :integer
    timestamps()
  end

  def get_all() do
    nbr_students_applied = length(Repo.all(
      from student in Student,
      join: appl in assoc(student, :student_session_applications),
      group_by: student.id,
      select: student.id
    ))

    applications = Repo.all(
      from appl in StudentSessionApplication,
      select: %{date: appl.inserted_at, motivation: appl.motivation }
    )
    words_per_appl = Enum.reduce(applications, 0 , fn x, acc -> length(String.split(x.motivation, " ")) + acc end) / length(applications)

    applications_per_day = Enum.map(applications, fn a -> a.date end)

    nbr_students = Repo.one(
      from student in Student,
      select: count(student.id)
    )
    # Fetch all companies with student session days and count their applications
    company = (Repo.all(
      from company in Company,
      where: company.student_session_days != 0,
      left_join: appl in assoc(company, :student_session_applications),
      left_join: scored_appl in StudentSessionApplication,
      on: scored_appl.company_id == company.id and scored_appl.score > 0,
      group_by: company.id,
      select: %{id: company.id, name: company.name, nbr_applications: count(appl.id, :distinct), scored_applications: count(scored_appl.id, :distinct)}
      ))

     %{
        nbr_searching_students: nbr_students_applied,
        nbr_students: nbr_students,
        company_stats: company,
        applications_per_day: applications_per_day,
        words_per_appl: words_per_appl
      }
  end

end
