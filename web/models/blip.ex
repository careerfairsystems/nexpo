defmodule Nexpo.Blip do
  use Nexpo.Web, :model

  schema "blips" do
    field :rating, :integer
    field :comment, :string
    belongs_to :student, Nexpo.Student
    belongs_to :company, Nexpo.Company

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct = %Nexpo.Blip{}, params \\ %{}) do
    struct
    |> cast(params, [:rating, :comment, :student_id, :company_id])
    |> validate_required([:student_id, :company_id])
    |> foreign_key_constraint(:student_id)
    |> foreign_key_constraint(:company_id)
    |> unique_constraint(:student_id, name: :company_id_student_id_index)
  end
end
