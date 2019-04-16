defmodule Nexpo.EmailView do
  use Nexpo.Web, :view

  def application_url do
    Application.get_env(:nexpo, :frontend_url)
  end

  def signup_url(user) do
    application_url() <> "/signup?key=" <> user.signup_key
  end

  def reset_password_url(user) do
    application_url() <>
      "/forgot-password?key=" <>
      case user.forgot_password_key do
        nil -> ""
        key -> key
      end
  end
end
