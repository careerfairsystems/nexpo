defmodule Nexpo.Repo.Migrations.AddTimeToForgotPasswordKey do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add(:forgot_password_time, :naive_datetime)
    end
  end
end
