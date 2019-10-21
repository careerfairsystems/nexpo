defmodule Nexpo.Repo.Migrations.StudentConfirmedToSessionState do
  use Ecto.Migration

  def change do
    alter table(:student_sessions) do
      remove(:student_confirmed)
    end

    alter table(:student_sessions) do
      add(:student_session_status, :integer, default: 0, null: false)
    end
  end
end
