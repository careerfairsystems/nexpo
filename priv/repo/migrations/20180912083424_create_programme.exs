defmodule Nexpo.Repo.Migrations.CreateProgramme do
  use Ecto.Migration

  def change do
    create table(:programmes) do
      add(:code, :string)
      add(:name, :string)

      timestamps()
    end
  end
end
