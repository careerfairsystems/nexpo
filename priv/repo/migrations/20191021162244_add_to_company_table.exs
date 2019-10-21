defmodule Nexpo.Repo.Migrations.AddToCompanyTable do
  use Ecto.Migration

  def change do
    alter table(:companies) do
      add(:host_name, :string)
      add(:host_mail, :string)
      add(:host_phone_number, :string)
    end
  end
end
