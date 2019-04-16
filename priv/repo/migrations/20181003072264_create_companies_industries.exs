defmodule Nexpo.Repo.Migrations.CreateCompaniesIndustries do
  use Ecto.Migration

  def change do
    create table(:companies_industries) do
      add(:company_id, references(:companies))
      add(:industry_id, references(:industries))
    end

    create(unique_index(:companies_industries, [:company_id, :industry_id]))
  end
end
