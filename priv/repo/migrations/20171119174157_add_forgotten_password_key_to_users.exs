defmodule Nexpo.Repo.Migrations.AddForgottenPasswordKeyToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add(:forgot_password_key, :string)
    end
  end
end
