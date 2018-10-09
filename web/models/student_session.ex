defmodule Nexpo.StudentSession do
  use Nexpo.Web, :model

  schema "student_sessions" do
    field :start, :naive_datetime
    field :end, :naive_datetime
    belongs_to :company, Nexpo.Company
    belongs_to :student, Nexpo.Student

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:start, :end, :company_id, :student_id])
    |> validate_required([:start, :end, :company_id, :student_id])
    |> unique_constraint(:unique, message: "Student has already a session with that company", name: :unique_session_id)
  end
end
