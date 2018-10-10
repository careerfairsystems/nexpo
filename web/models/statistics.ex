defmodule Nexpo.Statistics do
  use Nexpo.Web, :model
  alias Nexpo.Student
  alias Nexpo.Company
  alias Nexpo.Statistics
  alias Nexpo.Repo
  schema "statistics" do
    field :nbr_searching_students, :integer, virtual: true
    field :nbr_students, :integer, virtual: true
    field :company_stats, {:array, :map}, virtual: true
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [])
    |> validate_required([])
  end

  def get(query) do
    from(
      statistic in query,
      select: %{statistic | nbr_searching_students: 5}
    )
  end

  def getAll() do
    count = length(Repo.all(
      from student in Student,
      join: appl in assoc(student, :student_session_applications),
      group_by: student.id,
      select: student.id
    ))

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

    Enum.at(Repo.all(from(
      statistic in Statistics,
      select: %{
        nbr_searching_students: type(^count, :integer),
        nbr_students: type(^nbr_students, :integer),
        company_stats: type(^company, {:array, :map})
      }
    )), 0)
  end

end
