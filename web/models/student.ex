defmodule Nexpo.Student do
  use Nexpo.Web, :model

  schema "students" do
    field :year, :integer
    field :resumeEnUrl, :string
    field :resumeSvUrl, :string
    belongs_to :user, Nexpo.User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:year, :resumeEnUrl, :resumeSvUrl, :user_id])
    |> validate_required([:year, :resumeEnUrl, :resumeSvUrl, :user_id])
    |> foreign_key_constraint(:user_id) 
  end
end
