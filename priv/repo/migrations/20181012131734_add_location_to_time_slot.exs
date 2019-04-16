defmodule Nexpo.Repo.Migrations.AddLocationToTimeSlot do
  use Ecto.Migration

  def change do
    alter table(:student_session_time_slots) do
      add(:location, :string)
      remove(:used)
    end
  end
end
