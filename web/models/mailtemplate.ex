defmodule Nexpo.Mailtemplate do
  use Nexpo.Web, :model

  schema "mailtemplates" do
    field :name, :string
    field :subject, :string
    field :content, :string
    field :signature, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :subject, :content, :signature])
    |> validate_required([:name, :subject, :content, :signature])
    |> unique_constraint(:name)
  end
end
