defmodule Nexpo.Repo.Migrations.CreateMailtemplate do
  use Ecto.Migration

  def change do
    create table(:mailtemplates) do
      add(:name, :string)
      add(:subject, :string)
      add(:content, :text)
      add(:signature, :string)

      timestamps()
    end

    create(unique_index(:mailtemplates, [:name]))
  end
end
