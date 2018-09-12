defmodule Nexpo.Repo.Migrations.AlterUsersFields do
  use Ecto.Migration

  def change do
    remove :first_name, :string
    remove :last_name, :string
    add :firstName, :string
    add :lastName, :string
    add :foodPreference, :string
    add :phoneNumber, :string
  end
end
