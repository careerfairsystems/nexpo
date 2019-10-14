defmodule Nexpo.Repo.Migrations.AddInfoToStudents do
  use Ecto.Migration

  def change do
    alter table(:students) do
      add(:master, :string)
      add(:linked_in, :string)
    end
  end
end
