defmodule Nexpo.StudentSession do
  use Nexpo.Web, :model

  schema "student_sessions" do
    field :start, Ecto.Date
    field :end, Ecto.Date
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
  end
end
