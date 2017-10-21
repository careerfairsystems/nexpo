defmodule Nexpo.SessionController do
  use Nexpo.Web, :controller

  alias Nexpo.User

  def create(conn, %{"email" => email, "password" => password}) do
    case User.authenticate(%{email: email, password: password}) do
      {:ok, user} ->
        new_conn = Guardian.Plug.api_sign_in(conn, user)
        jwt = Guardian.Plug.current_token(new_conn)
        session = %{ jwt: jwt, user: user}
        new_conn
        |> put_resp_header("authorization", "Bearer #{jwt}")
        |> render("login.json", session: session)
      {:error, _} ->
        conn
        |> put_status(401)
        |> render(Nexpo.ErrorView, "401.json")
    end
  end

  def development_create(conn, %{"email" => email}) do
    case Nexpo.Repo.get_by(Nexpo.User, email: email) do
      nil ->
        conn
        |> put_status(404)
        |> render(Nexpo.ErrorView, "404.json")
      user ->
        new_conn = Guardian.Plug.api_sign_in(conn, user)
        jwt = Guardian.Plug.current_token(new_conn)
        session = %{ jwt: jwt, user: user}
        new_conn
        |> put_resp_header("authorization", "Bearer #{jwt}")
        |> render("login.json", session: session)
    end
  end

  # # Called when Guardian identifies an invalid jwt
  # def unauthenticated(conn, _params) do
  #   conn
  #   |> put_status(401)
  #   |> render(Nexpo.ErrorView, "error.json", message: "Authentication required")
  # end

  # # Called when Guardian fails to ensure that this user exists
  # def no_resource(conn, _params) do
  #   conn
  #   |> put_status(401)
  #   |> render(Nexpo.ErrorView, "error.json", message: "Authentication required")
  # end

end
