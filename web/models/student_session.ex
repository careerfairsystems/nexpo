defmodule Nexpo.StudentSession do
  use Nexpo.Web, :model

  alias Nexpo.Repo

  schema "student_sessions" do
    field(:start, :naive_datetime)
    field(:end, :naive_datetime)
    field(:student_confirmed, :boolean, default: false)

    belongs_to(:company, Nexpo.Company)
    belongs_to(:student, Nexpo.Student)
    belongs_to(:student_session_time_slot, Nexpo.StudentSessionTimeSlot)

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [
      :start,
      :end,
      :student_confirmed,
      :company_id,
      :student_id,
      :student_session_time_slot_id
    ])
    |> validate_required([:company_id, :student_id, :student_session_time_slot_id])
    |> unique_constraint(:unique,
      message: "Student has already a session with that company",
      name: :unique_session_id
    )
  end

  def student_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:student_confirmed])
  end

  def get_reserves() do
    Repo.all(
      from(
        company in Nexpo.Company,
        join: appl in assoc(company, :student_session_applications),
        join: student in assoc(appl, :student),
        join: user in assoc(student, :user),
        where: not is_nil(appl.score) and appl.score > 0,
        order_by: [desc: appl.score, asc: student.id],
        # Check that student does not already have session with given company
        left_join: session in Nexpo.StudentSession,
        on: student.id == session.student_id and session.company_id == company.id,
        where: is_nil(session.id),
        preload: [student_session_applications: {appl, student: {student, user: user}}]
      )
    )
  end
end
