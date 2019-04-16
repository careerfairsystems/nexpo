defmodule Nexpo.Repo.Migrations.CreateJobOffer do
  use Ecto.Migration

  def change do
    create table(:job_offers) do
      add(:type, :string)

      timestamps()
    end

    create(unique_index(:job_offers, [:type]))
  end
end
