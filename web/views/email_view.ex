defmodule Nexpo.EmailView do
  use Nexpo.Web, :view

  alias Nexpo.User

  def application_url do
    case Mix.env do
      :prod -> "https://" <> System.get_env("HOST_NAME")
      _ -> "http://localhost:3000"
    end
  end

  def signup_url(user) do
    User.signup_url(user)
  end

end
