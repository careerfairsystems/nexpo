defmodule Nexpo.Repo.Migrations.MoveStudentConfirmed do
  use Ecto.Migration

  def change do
    alter table(:student_session_applications) do
      remove(:studentConfirmed)
    end

    alter table(:student_sessions) do
      add(:studentConfirmed, :boolean, default: false, null: false)
    end
  end
end
