defmodule Nexpo.Company do
  use Nexpo.Web, :model

  schema "companies" do
    field :name, :string
    field :logoUrl, :string
    field :description, :string
    field :website, :string
    field :student_session_days, :integer, default: 0

    has_many :desired_programmes, Nexpo.DesiredProgramme

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :logoUrl, :description, :website])
    |> validate_required([:name, :logoUrl, :description, :website])
    |> unique_constraint(:name)
  end
end
