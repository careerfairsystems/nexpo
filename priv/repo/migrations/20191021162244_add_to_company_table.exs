defmodule Nexpo.Repo.Migrations.AddToCompanyTable do
  use Ecto.Migration

  def change do
    alter table(:company) do
      add(:host_name)
      add(:host_mail)
      add(:host_phone_number)
  end
end
