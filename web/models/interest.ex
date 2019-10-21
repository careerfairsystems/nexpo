defmodule Nexpo.Interest do
  use Nexpo.Web, :model

  alias Nexpo.Repo
  alias Nexpo.Interest

  schema "interests" do
    field(:name, :string)

    many_to_many(:students, Nexpo.Student,
      join_through: "student_interests",
      on_delete: :delete_all,
      on_replace: :delete
    )

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
    case Map.get(params, "interests") do
      nil ->
        changeset

      interest_ids ->
        interests =
          interest_ids
          |> Enum.map(fn {_, v} -> v end)
          |> get_assoc()

        changeset
        |> Ecto.Changeset.put_assoc(:interests, interests)
    end
  end

  defp get_assoc(interest_ids) do
    Repo.all(
      from(interest in Interest,
        where: interest.id in ^interest_ids
      )
    )
  end
end
