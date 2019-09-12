defmodule Nexpo.Repo.Migrations.CreateBlip do
  use Ecto.Migration

  def change do
    create table(:blips) do
      add :rating, :integer
      add :comment, :text
      add :user_id, references(:users, on_delete: :nothing)
      add :company_id, references(:companies, on_delete: :nothing)

      timestamps()
    end
    create index(:blips, [:user_id])
    create index(:blips, [:company_id])

  end
end
