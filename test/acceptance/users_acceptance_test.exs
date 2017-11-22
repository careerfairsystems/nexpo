defmodule Nexpo.UserAcceptanceTest do
  use Nexpo.ConnCase
  use Bamboo.Test

  alias Nexpo.User

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

  test "POST /password/forgot returns 200 if user exists", %{conn: conn} do
    user = Factory.create_user()
    params = %{email: user.email}

    conn = post(conn, "/api/password/forgot", params)

    assert json_response(conn, 200)
  end

  test "POST /password/forgot returns 200 if user does not exist", %{conn: conn} do
    params = %{email: "user that does not exist"}

    conn = post(conn, "/api/password/forgot", params)

    assert json_response(conn, 200)
  end

  test "POST /password/forgot sends email to user if it exists and generats key", %{conn: conn} do
    user = Factory.create_user
    params = %{email: user.email}

    conn = post(conn, "/api/password/forgot", params)

    assert json_response(conn, 200)

    user = Repo.get(User, user.id)

    assert_delivered_email Nexpo.Email.reset_password(user)
    assert user.forgot_password_key != nil
  end

  test "POST /password/new/:key returns 404 given invalid key", %{conn: conn} do
    params = %{
      password: "random-string",
      password_confirmation: "random-string"
    }
    conn = post(conn, "/api/password/new/"<>"invalid-key", params)

    assert json_response(conn, 404)
  end

  test "POST /password/new/:key return 200 given valid key", %{conn: conn} do
    user = Factory.create_user
    |> User.forgot_password_changeset
    |> Repo.update!

    params = %{
      password: "random-string",
      password_confirmation: "random-string"
    }

    conn = post(conn, "/api/password/new/"<>user.forgot_password_key, params)

    assert json_response(conn, 200)
  end

  test "POST /password/new/:key changes password given valid params", %{conn: conn} do
    user = Factory.create_user
    |> User.forgot_password_changeset
    |> Repo.update!

    prev_hashed_password = user.hashed_password

    p = "random-string"
    params = %{
      password: p,
      password_confirmation: p
    }

    conn = post(conn, "/api/password/new/"<>user.forgot_password_key, params)

    user = Repo.get(User, user.id)
    assert json_response(conn, 200)
    assert user.forgot_password_key == nil
    assert user.hashed_password != prev_hashed_password
  end

  test "POST /password/new/:key returns errors given invalid password", %{conn: conn} do
    user = Factory.create_user
    |> User.forgot_password_changeset
    |> Repo.update!

    prev_hashed_password = user.hashed_password

    params = %{
      password: "any-password",
      password_confirmation: "any-other-password"
    }

    conn = post(conn, "/api/password/new/"<>user.forgot_password_key, params)

    user = Repo.get(User, user.id)
    assert json_response(conn, 400)
    response = Poison.decode!(conn.resp_body)

    assert response["type"] == "error"
    assert Map.has_key?(response, "errors")

    assert user.forgot_password_key != nil
    assert user.hashed_password == prev_hashed_password
  end

  test "GET /password/forgot/:key returns 200 given valid key", %{conn: conn} do
    user = Factory.create_user
    |> User.forgot_password_changeset
    |> Repo.update!

    assert user.forgot_password_key != nil

    conn = get(conn, "/api/password/forgot/"<>user.forgot_password_key)

    assert json_response(conn, 200)
  end

  test "GET /password/forgot/:key returns 404 given invalid key", %{conn: conn} do
    conn = get(conn, "/api/password/forgot/"<>"invalid-key")

    assert json_response(conn, 404)
  end

end
