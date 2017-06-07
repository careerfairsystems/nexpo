defmodule Nexpo.CompanyEntry do
  use Nexpo.Web, :model

  schema "company_entries" do
    field :value, :string

    belongs_to :company, Nexpo.Company

    #field :company_category_attribute_id, :integer
    belongs_to :attribute, Nexpo.CompanyAttribute, foreign_key: :company_attribute_id

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:value])
    |> validate_required([:value])
  end
end
