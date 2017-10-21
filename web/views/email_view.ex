defmodule Nexpo.EmailView do
  use Nexpo.Web, :view

  def application_url do
    case Mix.env do
      :prod -> "https://" <> System.get_env("HOST_NAME")
      _ -> "http://localhost:3000"
    end
  end

end
