defmodule Nexpo.CompanyCategoryAttribute do
  use Nexpo.Web, :model

  schema "company_category_attributes" do
    field :title, :string
    field :type, :string
    field :value, :string

    field :company_category_id, :integer
    has_one :category, Nexpo.CompanyCategory

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title])
    |> validate_required([:title])
  end
end
