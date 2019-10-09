defmodule Nexpo.Repo.Migrations.CreateStudentInterests do
  use Ecto.Migration

  def change do
    create table(:student_interests) do
      add(:student_id, references(:students))
      add(:interest_id, references(:interests))
    end

    create(unique_index(:student_interests, [:student_id, :interest_id]))
  end
end
