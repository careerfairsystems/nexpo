defmodule Nexpo.JobOffer do
  use Nexpo.Web, :model

  schema "job_offers" do
    field :type, :string

    many_to_many :company, EctoAssoc.Company, join_through: "company_job_offer"
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:start, :end, :used])
    |> validate_required([:start, :end, :used])
  end
end
