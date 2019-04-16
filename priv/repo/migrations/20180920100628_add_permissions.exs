defmodule Nexpo.Repo.Migrations.AddPermissions do
  use Ecto.Migration

  def change do
    alter table(:roles) do
      add(:permissions, {:array, :string}, default: [])
    end
  end
end
