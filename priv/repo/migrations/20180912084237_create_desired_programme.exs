defmodule Nexpo.Repo.Migrations.CreateDesiredProgramme do
  use Ecto.Migration

  def change do
    create table(:desired_programme) do
      add(:score, :integer)
      add(:company_id, references(:companies, on_delete: :nothing))
      add(:programme_id, references(:programmes, on_delete: :nothing))

      timestamps()
    end

    create(index(:desired_programme, [:company_id]))
    create(index(:desired_programme, [:programme_id]))
  end
end
