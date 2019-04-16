defmodule Nexpo.Repo.Migrations.CreateRole do
  use Ecto.Migration

  def change do
    create table(:roles) do
      add(:type, :string)

      timestamps()
    end
  end
end
