defmodule Nexpo.Repo.Migrations.AddEmailToCompany do
  use Ecto.Migration

  def change do
    alter table(:companies) do
      remove :email
    end

  end
end
