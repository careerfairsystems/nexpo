defmodule Nexpo.Deadline do
  use Nexpo.Web, :model

  schema "deadlines" do
    field(:name, :string)
    field(:start, :naive_datetime)
    field(:end, :naive_datetime)

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :start, :end])
    |> validate_required([:name, :start, :end])
    |> unique_constraint(:name)
  end
end
