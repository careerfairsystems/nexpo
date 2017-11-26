defmodule Nexpo.UserTest do
  use Nexpo.ModelCase

  alias Nexpo.User
  alias Nexpo.Repo

  test "Changeset accepts valid params" do
    changeset = User.changeset(%User{}, Factory.params_for(:user))
    assert changeset.valid?
  end

  test "Changeset does not accept valid params" do
    changeset = User.changeset(%User{}, %{})
    assert !changeset.valid?
  end

  test "Password is hashed and does not exist in clear text" do
    changeset = User.changeset(%User{}, Factory.params_for(:user))
    assert changeset.valid?
    assert Map.has_key?(changeset.changes, :hashed_password)
    assert !Map.has_key?(changeset.changes, :password)
  end

  test "A user can authenticate given correct params" do
    params = Factory.params_for(:user)
    user = User.changeset(%User{}, params) |> Repo.insert!

    {status, result} = User.authenticate(params)
    assert status === :ok
    assert result === Repo.get!(User, user.id)
  end

  test "A user can not authenticate given incorrect params" do
    params = Factory.params_for(:user)
    user = User.changeset(%User{}, params) |> Repo.insert!

    params = Map.put(params, :password, params.password <> "hej")

    {status, result} = User.authenticate(params)
    assert status === :error
    assert result !== Repo.get!(User, user.id)
  end

  test "A user have a field for forgotten_password_key" do
    user = %User{}
    assert Map.has_key?(user, :forgot_password_key)
  end

  test "method for when user forgot password sets key and time" do
    user = Factory.create_user()
    assert user.forgot_password_key == nil
    assert user.forgot_password_time == nil

    user = User.forgot_password_changeset(user) |> Repo.update!

    assert user.forgot_password_key != nil
    assert user.forgot_password_time != nil

    time_now = DateTime.utc_now |> DateTime.to_unix
    time_key = user.forgot_password_time |> DateTime.to_unix
    time_diff = time_now - time_key
    assert time_diff < 3
  end

  test "check validity of forgot password key" do
    user = Factory.create_user |> User.forgot_password_changeset |> Repo.update!

    assert User.forgot_password_key_valid(user) == true

    {_, time} = user.forgot_password_time
    |> DateTime.to_unix
    |> Kernel.-(60 * 60)
    |> DateTime.from_unix
    user = Ecto.Changeset.change(user, forgot_password_time: time) |> Repo.update!

    assert User.forgot_password_key_valid(user) == false
  end

  test "reset_password_changeset works" do
    user = Factory.create_user()
    |> User.forgot_password_changeset()
    |> Repo.update!

    prev_hashed_password = user.hashed_password

    password = "random-string"
    changeset = user |> User.replace_forgotten_password_changeset(%{
      password: password, password_confirmation: password
    })

    assert changeset.valid? == true
    assert changeset.changes.hashed_password != prev_hashed_password
    assert changeset.changes.forgot_password_key == nil
  end

end
