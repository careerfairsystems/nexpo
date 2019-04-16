defmodule Nexpo.Repo.Migrations.UpdateStudentSessionWithTimeSlot do
  use Ecto.Migration

  def change do
    alter table(:student_sessions) do
      add(
        :student_session_time_slot_id,
        references(:student_session_time_slots, on_delete: :nothing)
      )
    end
  end
end
