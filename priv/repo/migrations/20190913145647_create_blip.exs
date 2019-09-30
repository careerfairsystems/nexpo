defmodule Nexpo.Repo.Migrations.CreateBlip do
  use Ecto.Migration

  def change do
    create table(:blips) do
      add(:rating, :integer)
      add(:comment, :text)
      add(:student_id, references(:students, on_delete: :nothing))
      add(:company_id, references(:companies, on_delete: :nothing))

      timestamps()
    end

    create(index(:blips, [:student_id]))
    create(index(:blips, [:company_id]))
    create unique_index(:blips, [:student_id, :company_id], name: :company_id_student_id_index)
  end
end
