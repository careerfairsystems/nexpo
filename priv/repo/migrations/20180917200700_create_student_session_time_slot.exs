defmodule Nexpo.Repo.Migrations.CreateStudentSessionTimeSlot do
  use Ecto.Migration

  def change do
    create table(:student_session_time_slots) do
      add :start, :naive_datetime
      add :end, :naive_datetime
      add :used, :boolean

      timestamps()
    end
  end
end
