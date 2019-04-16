defmodule Nexpo.Repo.Migrations.CompanyDescText do
  use Ecto.Migration

  def change do
    alter table(:companies) do
      modify(:description, :text)
    end
  end
end
