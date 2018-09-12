defmodule Nexpo.Company do
  use Nexpo.Web, :model
  use Arc.Ecto.Schema
  schema "companies" do
    field :name, :string
    field :logoUrl, Nexpo.ProfileImage.Type
    field :description, :string
    field :website, :string

    has_many :desired_programmes, Nexpo.DesiredProgramme

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :description, :website])
    |> cast_attachments(params, [:logoUrl])
    |> validate_required([:name, :description, :website])
    |> unique_constraint(:name)
  end
end
