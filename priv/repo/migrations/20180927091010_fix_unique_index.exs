defmodule Nexpo.Repo.Migrations.FixUniqueIndex do
  use Ecto.Migration

  def change do
    drop(index(:students, [:user_id]))
    create(unique_index(:students, [:user_id]))

    create(unique_index(:roles, [:type]))

    create(unique_index(:programmes, [:code]))

    create(
      unique_index(:desired_programme, [:company_id, :programme_id], name: :company_programme_id)
    )

    create(unique_index(:student_sessions, [:student_id, :company_id], name: :unique_session_id))

    create(
      unique_index(:student_session_applications, [:student_id, :company_id],
        name: :unique_session_appl_id
      )
    )
  end
end
