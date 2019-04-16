defmodule Nexpo.Repo.Migrations.CreateStudentSession do
  use Ecto.Migration

  def change do
    create table(:student_sessions) do
      add(:start, :date)
      add(:end, :date)
      add(:company_id, references(:companies, on_delete: :nothing))
      add(:student_id, references(:students, on_delete: :nothing))

      timestamps()
    end

    create(index(:student_sessions, [:company_id]))
    create(index(:student_sessions, [:student_id]))
  end
end
