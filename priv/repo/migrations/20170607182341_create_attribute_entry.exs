defmodule Nexpo.Repo.Migrations.CreateAttributeEntry do
  use Ecto.Migration

  def change do
    create table(:attribute_entries) do
      add :value, :string
      add :company_id, references(:companies, on_delete: :nothing)
      add :company_category_attribute_id, references(:company_category_attributes, on_delete: :nothing)

      timestamps()
    end
    create index(:attribute_entries, [:company_id])
    create index(:attribute_entries, [:company_category_attribute_id])

  end
end
