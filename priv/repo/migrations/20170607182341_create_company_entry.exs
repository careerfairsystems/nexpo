defmodule Nexpo.Repo.Migrations.CreateCompanyEntry do
  use Ecto.Migration

  def change do
    create table(:company_entries) do
      add(:value, :string)
      add(:company_id, references(:companies, on_delete: :nothing))
      add(:company_attribute_id, references(:company_attributes, on_delete: :nothing))

      timestamps()
    end

    create(index(:company_entries, [:company_id]))
    create(index(:company_entries, [:company_attribute_id]))
  end
end
