defmodule Nexpo.UserAcceptanceTest do
  use Nexpo.ConnCase
  use Bamboo.Test

  alias Nexpo.Repo
  alias Nexpo.User

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "GET /api/me return 401 on invalid jwt", %{conn: conn} do
    conn = get(conn, "/api/me")

    assert json_response(conn, 401)
  end

  test "GET /api/me returns 200 and current user on valid jwt", %{conn: conn} do
    params = Factory.params_for(:user)
    user = User.changeset(%User{}, params) |> Repo.insert!

    conn = conn
    |> Guardian.Plug.api_sign_in(user)

    conn = get(conn, "/api/me")

    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]

    assert response["id"] == user.id
  end

end
