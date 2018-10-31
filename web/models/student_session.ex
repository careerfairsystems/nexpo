defmodule Nexpo.StudentSession do
  use Nexpo.Web, :model

  schema "student_sessions" do
    field :start, :naive_datetime
    field :end, :naive_datetime
    field :student_confirmed, :boolean, default: false

    belongs_to :company, Nexpo.Company
    belongs_to :student, Nexpo.Student
    belongs_to :student_session_time_slot, Nexpo.StudentSessionTimeSlot

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:start, :end, :student_confirmed, :company_id, :student_id, :student_session_time_slot_id])
    |> validate_required([:company_id, :student_id, :student_session_time_slot_id])
    |> unique_constraint(:unique, message: "Student has already a session with that company", name: :unique_session_id)
  end

  def student_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:student_confirmed])
  end
end
