defmodule Nexpo.StudentSessionApplication do
  use Nexpo.Web, :model

  schema "student_session_applications" do
    field :motivation, :string
    field :companyApproved, :boolean, default: false
    field :studentConfirmed, :boolean, default: false
    field :score, :integer, default: 0
    belongs_to :company, Nexpo.Company
    belongs_to :student, Nexpo.Student

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:motivation, :companyApproved, :studentConfirmed, :score, :company_id, :student_id])
    |> validate_required([:motivation, :companyApproved, :studentConfirmed, :score, :company_id, :student_id])
  end
end
