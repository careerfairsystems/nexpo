defmodule Nexpo.Repo.Migrations.CreateRepresentative do
  use Ecto.Migration

  def change do
    create table(:representatives) do
      add(:user_id, references(:users, on_delete: :nothing))
      add(:company_id, references(:companies, on_delete: :nothing))

      timestamps()
    end

    create(index(:representatives, [:user_id]))
    create(index(:representatives, [:company_id]))
  end
end
