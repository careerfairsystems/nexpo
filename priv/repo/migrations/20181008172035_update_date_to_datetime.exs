defmodule Nexpo.Repo.Migrations.UpdateDateToDatetime do
  use Ecto.Migration

  def change do
    alter table(:student_session_time_slots) do
      modify(:start, :naive_datetime)
      modify(:end, :naive_datetime)
    end

    alter table(:student_sessions) do
      modify(:start, :naive_datetime)
      modify(:end, :naive_datetime)
    end
  end
end
