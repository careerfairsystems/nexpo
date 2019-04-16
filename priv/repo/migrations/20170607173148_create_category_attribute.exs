defmodule Nexpo.Repo.Migrations.CreateCategoryAttribute do
  use Ecto.Migration

  def change do
    create table(:company_attributes) do
      add(:title, :string)
      add(:type, :string)
      add(:value, :string)
      add(:company_category_id, references(:company_categories))

      timestamps()
    end
  end
end
