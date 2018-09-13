defmodule Nexpo.CategoryAttribute do
  use Nexpo.Web, :model

  schema "category_attributes" do
    field :title, :string
    field :type, :string
    field :value, :string

    belongs_to :category, Nexpo.Category, foreign_key: :category_id
    has_many :entries, Nexpo.CompanyEntry

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :type, :value, :category_id])
    |> validate_required([:title, :category_id])
    |> foreign_key_constraint(:category_id)
  end
end
