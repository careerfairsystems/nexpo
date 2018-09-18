defmodule Nexpo.Repo.Migrations.CreateIndustry do
  use Ecto.Migration

  def change do
    create table(:industries) do
      add :name, :string

      timestamps()
    end

  end
end
