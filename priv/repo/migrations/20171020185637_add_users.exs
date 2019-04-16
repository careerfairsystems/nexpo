defmodule Nexpo.Repo.Migrations.AddUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add(:email, :string, null: false)
      add(:hashed_password, :string, null: false)

      timestamps()
    end

    create(unique_index(:users, :email))
  end
end
