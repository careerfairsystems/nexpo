defmodule Nexpo.UserAcceptanceTest do
  use Nexpo.ConnCase

  test "GET /api/me return 401 on invalid jwt", %{conn: conn} do
    conn = get(conn, "/api/me")

    assert json_response(conn, 401)
  end

  @tag :logged_in
  test "GET /api/me returns 200 and current user on valid jwt", %{conn: conn, user: user} do
    conn = get(conn, "/api/me")

    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]

    assert response["id"] == user.id
  end

end
