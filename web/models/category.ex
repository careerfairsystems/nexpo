defmodule Nexpo.Category do
  use Nexpo.Web, :model

  schema "categories" do
    field(:title, :string)

    has_many(:attributes, Nexpo.CategoryAttribute, foreign_key: :category_id)

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
