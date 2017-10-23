defmodule Nexpo.ErrorViewTest do
  use Nexpo.ConnCase, async: true

  # Bring render/3 and render_to_string/3 for testing custom views
  import Phoenix.View

  test "renders 404.json" do
    result = render(Nexpo.ErrorView, "404.json", [])
    assert result == %{type: "error", error: "Could not be found"}
  end

  test "render 500.json" do
    result = render(Nexpo.ErrorView, "500.json", [])
    assert result == %{type: "error", error: "Internal server error"}
  end

  test "render 401.json" do
    result = render(Nexpo.ErrorView, "401.json", [])
    assert result == %{type: "error", error: "Unauthorized"}
  end

  test "render any other" do
    result = render(Nexpo.ErrorView, "undefined view", [])
    assert result == %{type: "error", error: "Internal server error"}
  end
end
