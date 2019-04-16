defmodule Nexpo.Repo.Migrations.AddFoodPhoneToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add(:food_preferences, :string)
      add(:phone_number, :string)
    end
  end
end
