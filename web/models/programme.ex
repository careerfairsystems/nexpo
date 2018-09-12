defmodule Nexpo.Programme do
  use Nexpo.Web, :model

  schema "programmes" do
    field :code, :string
    field :name, :string

    has_many :desired_programmes, Nexpo.DesiredProgramme

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:code, :name])
    |> validate_required([:code, :name])
  end
end
