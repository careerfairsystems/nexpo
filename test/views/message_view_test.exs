defmodule Nexpo.MessageViewTest do
  use Nexpo.ConnCase, async: true

  # Bring render/3 and render_to_string/3 for testing custom views
  import Phoenix.View

  test "renders message.json" do
    m = "This is a message"
    result = render(Nexpo.MessageView, "message.json", message: m)
    assert result == %{type: "message", data: m}
  end
end
