defmodule Nexpo.Repo.Migrations.CreateCategory do
  use Ecto.Migration

  def change do
    create table(:company_categories) do
      add(:title, :string)

      timestamps()
    end
  end
end
