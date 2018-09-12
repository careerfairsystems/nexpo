defmodule Nexpo.Repo.Migrations.AlterUsersFields do
  use Ecto.Migration

  def change do
    alter table(:users) do
      remove :first_name
      remove :last_name
      add :firstName, :string
      add :lastName, :string
      add :foodPreference, :string
      add :phoneNumber, :string
    end
  end
end
