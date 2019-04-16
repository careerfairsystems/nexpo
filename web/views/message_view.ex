defmodule Nexpo.MessageView do
  use Nexpo.Web, :view

  def render("message.json", %{message: message}) do
    %{
      type: "message",
      data: message
    }
  end
end
