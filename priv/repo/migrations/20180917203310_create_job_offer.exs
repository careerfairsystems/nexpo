defmodule Nexpo.Repo.Migrations.CreateJoboffer do
  use Ecto.Migration

  def change do
    create table(:job_offers) do
      add :type, :string

      timestamps()
    end
  end
end
