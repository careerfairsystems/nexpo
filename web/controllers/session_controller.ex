defmodule Nexpo.SessionController do
  use Nexpo.Web, :controller

  alias Nexpo.{Repo, User}

  @apidoc """
  @api {POST} /login Login
  @apiGroup Login

  @apiParam {String} email      Username
  @apiParam {String} password   Password

  @apiSuccessExample {json} Success
    HTTP 201 Created
    {
      "data": {
        "jwt": "randomly-generated-string"
      }
    }

  @apiUse BadRequestError
  @apiUse UnauthorizedError
  """
  def create(conn, %{"email" => email, "password" => password}) do
    case User.authenticate(%{
           email: email |> String.trim() |> String.downcase(),
           password: password
         }) do
      {:ok, user} ->
        permissions = User.get_permissions(user)
        perms = %{default: permissions}
        {_status, jwt, _decoded_jwt} = Guardian.encode_and_sign(user, %{}, perms: perms, ttl: {72, :hours})
        session = %{jwt: jwt}

        conn
        |> put_status(200)
        |> put_resp_header("authorization", "Bearer #{jwt}")
        |> render("login.json", session: session)

      {:error, _} ->
        conn
        |> put_status(401)
        |> render(Nexpo.ErrorView, "401.json")
    end
  end

  @doc """
  Endpoint only available in development
  This allows developers to login as anybody, by only specifying email
  """
  def development_create(conn, %{"email" => email}) do
    case Repo.get_by(User, email: email |> String.trim() |> String.downcase()) do
      nil ->
        conn
        |> put_status(404)
        |> render(Nexpo.ErrorView, "404.json")

      user ->
        permissions = User.get_permissions(user)
        perms = %{default: permissions}
        new_conn = Guardian.Plug.api_sign_in(conn, user, %{}, perms: perms)
        jwt = Guardian.Plug.current_token(new_conn)
        session = %{jwt: jwt, user: user}

        new_conn
        |> put_resp_header("authorization", "Bearer #{jwt}")
        |> render("login.json", session: session)
    end
  end

  # Called when Guardian identifies an unauthenticated jwt
  def unauthenticated(conn, _params) do
    conn
    |> put_status(401)
    |> render(Nexpo.ErrorView, "401.json")
  end

  # Called when Guardian identifies an unauthorized jwt
  def unauthorized(conn, _params) do
    conn
    |> put_status(401)
    |> render(Nexpo.ErrorView, "401.json")
  end

  # Called when Guardian fails to ensure that this user exists
  def no_resource(conn, _params) do
    conn
    |> put_status(401)
    |> render(Nexpo.ErrorView, "401.json")
  end

  @apidoc
end
