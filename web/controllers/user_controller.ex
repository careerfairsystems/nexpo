defmodule Nexpo.UserController do
  use Nexpo.Web, :controller
  use Guardian.Phoenix.Controller

  def me(conn, %{}, user, _claims) do
    conn |> put_status(200) |> render("show.json", user: user)
  end

end
