defmodule Nexpo.Representative do
  use Nexpo.Web, :model

  alias Nexpo.Repo
  alias Nexpo.Representative

  schema "representatives" do
    belongs_to :user, Nexpo.User, foreign_key: :user_id
    belongs_to :company, Nexpo.Company, foreign_key: :company_id

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:user_id, :company_id])
    |> validate_required([:user_id, :company_id])
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:company_id)
  end

  def build_assoc!(user, company_id) do
    representative = %Representative{user_id: user.id, company_id: company_id}
      |> Representative.changeset
      |> Repo.insert!

    Repo.preload(user, :representative)
    |> Ecto.Changeset.change
    |> Ecto.Changeset.put_assoc(:representative, representative)
    |> Repo.update!
  end
end
