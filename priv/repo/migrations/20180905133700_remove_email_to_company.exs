defmodule Nexpo.Repo.Migrations.RemoveEmailToCompany do
  use Ecto.Migration

  def change do
    alter table(:companies) do
      remove(:email)
    end
  end
end
