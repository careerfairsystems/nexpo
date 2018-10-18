defmodule Nexpo.Programme do
  use Nexpo.Web, :model

  alias Nexpo.Programme
  alias Nexpo.Repo

  schema "programmes" do
    field :code, :string
    field :name, :string

    has_many :students, Nexpo.Student
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

  def put_assoc(changeset, params) do
    case Map.get(params, "programme") do
      nil ->
        changeset
      programme_id ->
        programme = Repo.get!(Programme, programme_id)
        changeset
        |> Ecto.Changeset.put_assoc(:programme, programme)
    end
  end
end
