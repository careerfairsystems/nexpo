defmodule Nexpo.Repo.Migrations.AddLogoDescWebsiteToCompany do
  use Ecto.Migration

  def change do
    alter table(:companies) do
      add(:logoUrl, :string)
      add(:description, :string)
      add(:website, :string)
    end
  end
end
