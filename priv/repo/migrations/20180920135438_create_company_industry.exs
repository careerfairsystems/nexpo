defmodule Nexpo.Repo.Migrations.CreateCompanyIndustry do
  use Ecto.Migration

  def change do
    create table(:company_industry) do
      add :company_id, references(:companies)
      add :industry_id, references(:industries)
    end

    create unique_index(:company_industry, [:company_id, :industry_id])

  end
end
