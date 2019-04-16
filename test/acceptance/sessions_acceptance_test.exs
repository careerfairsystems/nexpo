defmodule Nexpo.SessionsAcceptanceTest do
  use Nexpo.ConnCase

  alias Nexpo.User

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "production" do
    test "POST /login is successful and returns JWT given valid params", %{conn: conn} do
      params = Factory.params_for(:user)
      User.changeset(%User{}, params) |> Repo.insert!()
      conn = post(conn, "/api/login", params)

      assert json_response(conn, 200)
      response = Poison.decode!(conn.resp_body)["data"]

      assert Map.get(response, "jwt") != nil
    end

    test "POST /login is unsuccessful and does not return a JWT given invalid params", %{
      conn: conn
    } do
      params = Factory.params_for(:user)
      User.changeset(%User{}, params) |> Repo.insert!()
      params = Map.put(params, :password, params.password <> "invalid")
      conn = post(conn, "/api/login", params)

      assert json_response(conn, 401)
      response = Poison.decode!(conn.resp_body)

      assert Map.has_key?(response, "error")
    end
  end

  describe "development" do
    test "POST /login is successful and returns JWT given valid params", %{conn: conn} do
      params = Factory.params_for(:user)
      User.changeset(%User{}, params) |> Repo.insert!()

      params = params |> Map.take([:email])
      conn = post(conn, "/api/development_login", params)

      assert json_response(conn, 200)
      response = Poison.decode!(conn.resp_body)["data"]

      assert Map.get(response, "jwt") != nil
    end

    test "POST /login is unsuccessful and does not return a JWT given invalid params", %{
      conn: conn
    } do
      params = Factory.params_for(:user)
      User.changeset(%User{}, params) |> Repo.insert!()

      params =
        params
        |> Map.take([:email])
        |> Map.put(:email, params.email <> "invalid")

      conn = post(conn, "/api/development_login", params)

      assert json_response(conn, 404)
      response = Poison.decode!(conn.resp_body)

      assert Map.has_key?(response, "error")
    end
  end
end
