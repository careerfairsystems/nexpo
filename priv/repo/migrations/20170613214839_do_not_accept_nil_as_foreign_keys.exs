defmodule Nexpo.Repo.Migrations.DoNotAcceptNilAsForeignKeys do
  use Ecto.Migration
  import Ecto.Query
  alias Nexpo.Repo

  def up do

    from(
      e in Nexpo.CompanyEntry,
      where: is_nil(e.company_id),
      where: is_nil(e.company_attribute_id)
    )
    |> Repo.delete_all

    alter table(:company_entries) do
      modify :company_id, :integer, null: false
      modify :company_attribute_id, :integer, null: false
    end

    from(
      a in Nexpo.CategoryAttribute,
      where: is_nil(a.company_category_id)
    )
    |> Repo.delete_all

    alter table(:company_attributes) do
      modify :company_category_id, :integer, null: false
    end
  end

  def down do
    alter table(:company_entries) do
      modify :company_id, :integer, null: true
      modify :company_attribute_id, :integer, null: true
    end
    alter table(:company_attributes) do
      modify :company_category_id, :integer, null: true
    end
  end

end
