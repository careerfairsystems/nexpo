defmodule Nexpo.Repo.Migrations.AddProgrammeToStudent do
  use Ecto.Migration

  def change do
    alter table(:students) do
      add(:programme_id, references(:programmes, on_delete: :nilify_all))
    end
  end
end
