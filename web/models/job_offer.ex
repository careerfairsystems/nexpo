defmodule Nexpo.JobOffer do
  use Nexpo.Web, :model

  alias Nexpo.Repo
  alias Nexpo.JobOffer

  schema "job_offers" do
    field(:type, :string)

    many_to_many(:companies, Nexpo.Company,
      join_through: "companies_job_offers",
      on_replace: :delete
    )

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:type])
    |> validate_required([:type])
  end

  def put_assoc(changeset, params) do
    case Map.get(params, "job_offer_ids") do
      nil ->
        changeset

      job_offer_ids ->
        job_offers = get_assoc(job_offer_ids)

        changeset
        |> Ecto.Changeset.put_assoc(:job_offers, job_offers)
    end
  end

  defp get_assoc(job_offer_ids) do
    Repo.all(
      from(job_offer in JobOffer,
        where: job_offer.id in ^job_offer_ids
      )
    )
  end
end
