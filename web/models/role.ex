defmodule Nexpo.Role do
  use Nexpo.Web, :model

  schema "roles" do
    field :type, :string

    many_to_many :users, Nexpo.User, join_through: "users_roles"

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:type])
    |> validate_required([:type])
  end
end
