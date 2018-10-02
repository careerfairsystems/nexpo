defmodule Nexpo.Industry do
  use Nexpo.Web, :model

  alias Nexpo.Repo
  alias Nexpo.Industry

  schema "industries" do
    field :name, :string

    many_to_many :companies, Nexpo.Company, join_through: "companies_industries", on_replace: :delete

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

  def put_assoc(changeset, params) do
    case Map.get(params, "industry_ids") do
      nil ->
        changeset
      industry_ids ->
        industries = get_assoc(industry_ids)
        changeset
        |> Ecto.Changeset.put_assoc(:industries, industries)
    end
  end

  defp get_assoc(industry_ids) do
    Repo.all(from(
      industry in Industry,
      where: industry.id in ^industry_ids)
    )
  end
end
