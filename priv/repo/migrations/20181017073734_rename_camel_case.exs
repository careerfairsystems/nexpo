defmodule Nexpo.Repo.Migrations.RenameCamelCase do
  use Ecto.Migration

  def change do
    rename(table(:student_sessions), :studentConfirmed, to: :student_confirmed)
    rename(table(:student_session_applications), :companyApproved, to: :company_approved)
  end
end
