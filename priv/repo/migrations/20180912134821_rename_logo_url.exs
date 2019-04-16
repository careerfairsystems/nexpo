defmodule Nexpo.Repo.Migrations.RenameLogoUrl do
  use Ecto.Migration

  def change do
    rename(table(:companies), :logoUrl, to: :logo_url)
  end
end
