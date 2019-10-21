defmodule Nexpo.Repo.Migrations.CreateInterests do
  use Ecto.Migration

  def change do
    create table(:interests) do
      add(:name, :string)

      timestamps()
    end

    create(unique_index(:interests, [:name]))
  end
end
