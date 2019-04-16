defmodule Nexpo.Repo.Migrations.AddStudentSessionDays do
  use Ecto.Migration

  def change do
    alter table(:companies) do
      add(:student_session_days, :integer, default: 0)
    end
  end
end
