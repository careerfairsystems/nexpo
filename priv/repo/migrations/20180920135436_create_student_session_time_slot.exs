defmodule Nexpo.Repo.Migrations.CreateStudentSessionTimeSlot do
  use Ecto.Migration

  def change do
    create table(:student_session_time_slots) do
      add :start, :datetime
      add :end, :datetime
      add :used, :boolean, default: false, null: false

      timestamps()
    end

  end
end
