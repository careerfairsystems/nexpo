defmodule Nexpo.DesiredProgramme do
  use Nexpo.Web, :model

  schema "desired_programme" do
    field :score, :integer
    belongs_to :company, Nexpo.Company
    belongs_to :programme, Nexpo.Programme

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:score, :company_id, :programme_id])
    |> validate_required([:score, :company_id, :programme_id])
  end
end
