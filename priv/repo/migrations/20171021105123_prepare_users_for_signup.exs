defmodule Nexpo.Repo.Migrations.PrepareUsersForSignup do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add(:signup_key, :string)
      modify(:hashed_password, :string, null: true)
    end
  end
end
