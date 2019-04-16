defmodule Nexpo.Repo.Migrations.CreateStudentSessionApplication do
  use Ecto.Migration

  def change do
    create table(:student_session_applications) do
      add(:motivation, :text)
      add(:companyApproved, :boolean, default: false, null: false)
      add(:studentConfirmed, :boolean, default: false, null: false)
      add(:score, :integer)
      add(:company_id, references(:companies, on_delete: :nothing))
      add(:student_id, references(:students, on_delete: :nothing))

      timestamps()
    end

    create(index(:student_session_applications, [:company_id]))
    create(index(:student_session_applications, [:student_id]))
  end
end
