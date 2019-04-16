defmodule Nexpo.Repo.Migrations.CreateCompaniesJobOffers do
  use Ecto.Migration

  def change do
    create table(:companies_job_offers) do
      add(:company_id, references(:companies))
      add(:job_offer_id, references(:job_offers))
    end

    create(unique_index(:companies_job_offers, [:company_id, :job_offer_id]))
  end
end
