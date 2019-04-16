defmodule Nexpo.Repo.Migrations.FixCategory do
  use Ecto.Migration

  def change do
    drop(constraint(:company_entries, "company_entries_company_attribute_id_fkey"))
    drop(constraint(:company_attributes, "company_attributes_pkey"))
    drop(constraint(:company_attributes, "company_attributes_company_category_id_fkey"))
    drop(constraint(:company_categories, "company_categories_pkey"))

    rename(table(:company_categories), to: table(:categories))
    rename(table(:company_attributes), to: table(:category_attributes))

    alter table(:categories) do
      modify(:id, :integer, primary_key: true)
    end

    alter table(:category_attributes) do
      modify(:id, :integer, primary_key: true)
    end

    rename(table(:category_attributes), :company_category_id, to: :category_id)
    rename(table(:company_entries), :company_attribute_id, to: :category_attribute_id)

    alter table(:category_attributes) do
      modify(:category_id, references(:categories, on_delete: :delete_all))
    end

    alter table(:company_entries) do
      modify(:category_attribute_id, references(:category_attributes, on_delete: :delete_all))
    end
  end
end
