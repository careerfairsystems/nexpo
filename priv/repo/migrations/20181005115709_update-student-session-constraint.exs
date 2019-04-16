defmodule Nexpo.Repo.Migrations.UpdateStudentSessionConstraint do
  use Ecto.Migration

  def change do
    drop(constraint(:student_sessions, "student_sessions_company_id_fkey"))

    drop(
      constraint(:student_session_applications, "student_session_applications_company_id_fkey")
    )

    alter table(:student_sessions) do
      modify(:company_id, references(:companies, on_delete: :nilify_all))
    end

    alter table(:student_session_applications) do
      modify(:company_id, references(:companies, on_delete: :nilify_all))
    end
  end
end
