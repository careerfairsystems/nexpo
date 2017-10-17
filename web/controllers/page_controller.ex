defmodule Nexpo.PageController do
  use Nexpo.Web, :controller

  @doc """
  Serves index.html of frontend
  ReactRouter will inflate client side and match the url correctly
  """
  def serve_frontend(conn, _params) do
    conn
    |> put_resp_header("content-type", "text/html; charset=utf-8")
    |> Plug.Conn.send_file(200, "priv/react_app/build/index.html")
  end

end
