defmodule Nexpo.EmailViewTest do
  use Nexpo.ConnCase, async: true

  import Nexpo.EmailView
  alias Nexpo.User

  test "reset password url when user has no key" do
    user = Factory.create_user
    expected = Application.get_env(:nexpo, :frontend_url) <> "/forgot-password?key="
    result = reset_password_url(user)
    assert result == expected
  end

  test "reset password url when user has key" do
    user = Factory.create_user |> User.forgot_password_changeset |> Repo.update!
    result = reset_password_url(user)

    key = user.forgot_password_key

    assert key != nil

    expected = Application.get_env(:nexpo, :frontend_url)
    <> "/forgot-password?key="
    <> key

    assert result == expected
  end

  test "application_url" do
    assert application_url() == Application.get_env(:nexpo, :frontend_url)
  end

  test "signup_url" do
    user = Nexpo.User.initial_signup!(%{email: "hejsan@test.se"})

    expected = Application.get_env(:nexpo, :frontend_url) <> "/signup?key=" <> user.signup_key
    assert signup_url(user) == expected
  end

end
