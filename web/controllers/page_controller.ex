defmodule Nexpo.PageController do
  use Nexpo.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
