defmodule Nexpo.Repo.Migrations.UnusedFieldsStudentSessions do
  use Ecto.Migration

  def change do
    alter table(:student_sessions) do
      remove(:start)
      remove(:end)
    end
  end
end
