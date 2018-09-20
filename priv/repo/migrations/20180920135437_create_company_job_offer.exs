defmodule Nexpo.Repo.Migrations.CreateCompanyJobOffer do
  use Ecto.Migration

  def change do
    create table(:company_job_offer) do
      add :company_id, references(:companies)
      add :job_offer_id, references(:job_offers)
    end

    create unique_index(:company_job_offer, [:company_id, :job_offer_id])
  end
end
