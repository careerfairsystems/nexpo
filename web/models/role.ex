defmodule Nexpo.Role do
  use Nexpo.Web, :model

  alias Nexpo.Repo
  alias Nexpo.Role

  schema "roles" do
    field :type, :string
    field :permissions, {:array, :string}, default: []

    many_to_many :users, Nexpo.User, join_through: "users_roles", on_delete: :delete_all

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:type, :permissions])
    |> validate_required([:type, :permissions])
  end

  def put_assoc(changeset, params) do
    case Map.get(params, "roles") do
      nil ->
        changeset
      role_ids ->
        roles = get_assoc(role_ids)
        changeset
        |> Ecto.Changeset.put_assoc(:roles, roles)
    end
  end

  defp get_assoc(role_ids) do
    Repo.all(from(
      role in Role,
      where: role.id in ^role_ids)
    )
  end

end
