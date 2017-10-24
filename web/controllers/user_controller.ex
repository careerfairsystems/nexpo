defmodule Nexpo.UserController do
  use Nexpo.Web, :controller

  alias Nexpo.UserView

  def me(conn, %{}) do
    user = Guardian.Plug.current_resource(conn)
    conn |> put_status(200) |> render(UserView, "show.json", user: user)
  end

end
