defmodule Nexpo.Repo.Migrations.CreateStatistics do
  use Ecto.Migration

  def change do
    create table(:statistics) do

      timestamps()
    end

  end
end
