defmodule Nexpo.EmailViewTest do
  use Nexpo.ConnCase, async: true

  alias Nexpo.EmailView
  alias Nexpo.User

  test "reset password url when user has no key" do
    user = Factory.create_user
    result = EmailView.reset_password_url(user)

    expected = EmailView.application_url() <> "/forgotten_password?key="

    assert result == expected
  end

  test "reset password url when user has key" do
    user = Factory.create_user |> User.forgot_password_changeset |> Repo.update!
    result = EmailView.reset_password_url(user)

    key = user.forgot_password_key

    assert key != nil

    expected = EmailView.application_url()
    <> "/forgotten_password?key="
    <> key

    assert result == expected
  end

end
