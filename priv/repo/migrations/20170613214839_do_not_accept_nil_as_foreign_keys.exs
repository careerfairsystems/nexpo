defmodule Nexpo.Repo.Migrations.DoNotAcceptNilAsForeignKeys do
  use Ecto.Migration

  def change do
    alter table(:company_entries) do
      modify(:company_id, :integer, null: false)
      modify(:company_attribute_id, :integer, null: false)
    end

    alter table(:company_attributes) do
      modify(:company_category_id, :integer, null: false)
    end
  end
end
