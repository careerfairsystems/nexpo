defmodule Nexpo.Repo.Migrations.CreateDeadline do
  use Ecto.Migration

  def change do
    create table(:deadlines) do
      add(:name, :string)
      add(:start, :naive_datetime)
      add(:end, :naive_datetime)

      timestamps()
    end

    create(unique_index(:deadlines, [:name]))
  end
end
