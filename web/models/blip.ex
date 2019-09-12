defmodule Nexpo.Blip do
  use Nexpo.Web, :model

  schema "blips" do
    field :rating, :integer
    field :comment, :string
    belongs_to :user, Nexpo.User
    belongs_to :company, Nexpo.Company

    timestamps()
  end


  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:rating, :comment, :user_id])
    |> validate_required([:rating, :comment, ])
    |> foreign_key_constraint(:user_id)
  end
end
