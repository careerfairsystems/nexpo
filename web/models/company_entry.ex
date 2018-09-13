defmodule Nexpo.CompanyEntry do
  use Nexpo.Web, :model

  schema "company_entries" do
    field :value, :string

    belongs_to :company, Nexpo.Company
    belongs_to :attribute, Nexpo.CategoryAttribute, foreign_key: :category_attribute_id

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:value, :company_id, :category_attribute_id])
    |> validate_required([:value, :company_id, :category_attribute_id])
    |> foreign_key_constraint(:company_id)
    |> foreign_key_constraint(:category_attribute_id)
  end
end
