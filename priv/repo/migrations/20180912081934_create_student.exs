defmodule Nexpo.Repo.Migrations.CreateStudent do
  use Ecto.Migration

  def change do
    create table(:students) do
      add(:year, :integer)
      add(:resumeEnUrl, :string)
      add(:resumeSvUrl, :string)
      add(:user_id, references(:users, on_delete: :nothing))

      timestamps()
    end

    create(index(:students, [:user_id]))
  end
end
