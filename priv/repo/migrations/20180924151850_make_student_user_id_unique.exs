defmodule Nexpo.Repo.Migrations.MakeStudentUserIdUnique do
  use Ecto.Migration

  def change do
    alter table(:students) do
      modify(:user_id, :integer, unique: true)
    end
  end
end
