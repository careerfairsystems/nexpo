defmodule Nexpo.EmailView do
  use Nexpo.Web, :view

  alias Nexpo.User

  def application_url do
    Application.get_env(:nexpo, :frontend_url)
  end

  def signup_url(user) do
    User.signup_url(user)
  end

end
