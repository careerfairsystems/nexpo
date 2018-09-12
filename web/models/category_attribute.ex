defmodule Nexpo.CompanyAttribute do
  use Nexpo.Web, :model

  schema "company_attributes" do
    field :title, :string
    field :type, :string
    field :value, :string

    #field :company_category_id, :integer
    belongs_to :category, Nexpo.CompanyCategory, foreign_key: :company_category_id

    #field :attribute_entry_id, :integer
    has_many :entries, Nexpo.CompanyEntry#, foreign_key: :company_entry_id


    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :type, :value, :company_category_id])
    |> validate_required([:title, :company_category_id])
    |> foreign_key_constraint(:company_category_id)
  end
end
