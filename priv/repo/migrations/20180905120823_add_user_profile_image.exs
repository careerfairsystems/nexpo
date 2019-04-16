defmodule Nexpo.Repo.Migrations.AddUserProfileImage do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add(:profile_image, :string)
    end
  end
end
