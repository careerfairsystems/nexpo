defmodule Nexpo.EmailViewTest do
  use Nexpo.ConnCase, async: true

  import Nexpo.EmailView

  test "application_url" do
    assert application_url() == Application.get_env(:nexpo, :frontend_url)
  end

  test "signup_url" do
    user = Nexpo.User.initial_signup!(%{username: "hejsan"})

    expected = application_url() <> "/signup?key=" <> user.signup_key
    assert signup_url(user) == expected
  end

end
