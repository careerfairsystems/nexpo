defmodule Nexpo.Repo.Migrations.AddEmailToCompany do
  use Ecto.Migration

  def change do
    alter table(:companies) do
      add(:email, :string)
    end
  end
end
