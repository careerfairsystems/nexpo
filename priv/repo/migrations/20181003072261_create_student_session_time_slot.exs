defmodule Nexpo.Repo.Migrations.CreateStudentSessionTimeSlot do
  use Ecto.Migration

  def change do
    create table(:student_session_time_slots) do
      add(:start, :date)
      add(:end, :date)
      add(:used, :boolean, default: false, null: false)
      add(:company_id, references(:companies, on_delete: :nothing))

      timestamps()
    end

    create(index(:student_session_time_slots, [:company_id]))
  end
end
