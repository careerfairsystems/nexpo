defmodule Nexpo.Repo.Migrations.CreateUsersRoles do
  use Ecto.Migration

  def change do
    create table(:users_roles) do
      add(:user_id, references(:users))
      add(:role_id, references(:roles))
    end

    create(unique_index(:users_roles, [:user_id, :role_id]))
  end
end
