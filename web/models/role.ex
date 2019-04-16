defmodule Nexpo.Role do
  use Nexpo.Web, :model

  schema "roles" do
    field(:type, :string)
    field(:permissions, {:array, :string}, default: [])

    many_to_many(:users, Nexpo.User,
      join_through: "users_roles",
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
    |> cast(params, [:type, :permissions])
    |> validate_required([:type, :permissions])
  end
end
