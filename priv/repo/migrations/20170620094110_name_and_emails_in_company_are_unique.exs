defmodule Nexpo.Repo.Migrations.NameAndEmailsInCompanyAreUnique do
  use Ecto.Migration

  def change do
    create(unique_index(:companies, [:name]))
    create(unique_index(:companies, [:email]))
  end
end
