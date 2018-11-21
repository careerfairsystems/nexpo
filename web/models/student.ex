defmodule Nexpo.Student do
  use Nexpo.Web, :model
  use Arc.Ecto.Schema

  alias Nexpo.Repo
  alias Nexpo.Student

  schema "students" do
    field :year, :integer
    field :resume_en_url, Nexpo.CvEn.Type
    field :resume_sv_url, Nexpo.CvSv.Type

    belongs_to :user, Nexpo.User, foreign_key: :user_id
    belongs_to :programme, Nexpo.Programme, on_replace: :delete

    has_many :student_sessions, Nexpo.StudentSession, on_delete: :nilify_all
    has_many :student_session_applications, Nexpo.StudentSessionApplication, on_delete: :nilify_all

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:year, :user_id])
    |> cast_attachments(params, [:resume_en_url, :resume_sv_url])
    |> validate_required([:user_id])
    |> unique_constraint(:user_id, message: "Student already has a User")
    |> foreign_key_constraint(:user_id)
  end

  def build_assoc!(user) do
    student = %Student{user_id: user.id} |> Student.changeset |> Repo.insert!

    Repo.preload(user, :student)
    |> Ecto.Changeset.change
    |> Ecto.Changeset.put_assoc(:student, student)
    |> Repo.update!
  end

  def get_available(company, time_slots) do
    ids = Repo.all(
      from appl in Ecto.assoc(company, :student_session_applications),
      join: student in assoc(appl, :student),
      where: not is_nil(appl.score) and appl.score > 0,
      order_by: [desc: appl.score, asc: student.id],
      # Check that student does not already have session with given company
      left_join: session in Nexpo.StudentSession,
      on: student.id == session.student_id and session.company_id == ^company.id,
      where: is_nil(session.id),
      limit: ^length(time_slots),
      select: student.id)

    Repo.all(
      from student in Student,
      where: student.id in ^ids,
      left_join: session in assoc(student, :student_sessions),
      group_by: student.id,
      order_by: count(session.id),
      select: student)
  end
end
