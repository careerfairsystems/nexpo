defmodule :"Elixir.Nexpo.Repo.Migrations.Update-student-session-on-delete" do
  use Ecto.Migration

  def change do
    drop(constraint(:student_sessions, "student_sessions_student_id_fkey"))

    drop(
      constraint(:student_session_applications, "student_session_applications_student_id_fkey")
    )

    alter table(:student_sessions) do
      modify(:student_id, references(:students, on_delete: :nilify_all))
    end

    alter table(:student_session_applications) do
      modify(:student_id, references(:students, on_delete: :nilify_all))
    end
  end
end
