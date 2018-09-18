defmodule Nexpo.StudentSession do
  use Nexpo.Web, :model

  schema "student_sessions" do
    field :start, Ecto.Date
    field :end_date, :string
    belongs_to :company, Nexpo.Company
    belongs_to :student, Nexpo.Student

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:start, :end_date, :company_id, :student_id])
    |> validate_required([:start, :end_date, :company_id, :student_id])
  end
end
