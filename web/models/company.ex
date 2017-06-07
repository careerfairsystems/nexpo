defmodule Nexpo.Company do
  use Nexpo.Web, :model

  schema "companies" do
    field :name, :string

    has_many :entries, Nexpo.CompanyEntry

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name])
    |> validate_required([:name])
  end
end
