defmodule Nexpo.UserAcceptanceTest do
  use Nexpo.ConnCase
  use Bamboo.Test

  alias Nexpo.User
  alias Nexpo.Factory

  describe "GET /api/me" do
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
      assert response["student"]["id"] == user.student.id
    end
  end

  describe "PUT /api/me" do
    test "PUT /api/me return 401 on invalid jwt", %{conn: conn} do
      conn = put(conn, "/api/me", %{})

      assert json_response(conn, 401)
    end

    @tag :logged_in
    test "PUT /api/me returns 200 and current user on valid jwt", %{conn: conn, user: user} do
      conn = put(conn, "/api/me", %{user: %{}})

      assert json_response(conn, 200)
      response = Poison.decode!(conn.resp_body)["data"]

      assert response["id"] == user.id
    end
  end

  describe "DELETE /api/me" do
    test "DELETE /api/me return 401 on invalid jwt", %{conn: conn} do
      conn = delete(conn, "/api/me")

      assert json_response(conn, 401)
    end

    @tag :logged_in
    test "DELETE /api/me returns 200 and current user on valid jwt", %{conn: conn, user: user} do
      conn = delete(conn, "/api/me")

      assert response(conn, 204)
      refute Repo.get(User, user.id)
    end
  end

  describe "POST /api/password/forgot" do
    test "returns 200 if user exists", %{conn: conn} do
      user = Factory.create_user()
      params = %{email: user.email}

      conn = post(conn, "/api/password/forgot", params)

      assert json_response(conn, 200)
    end

    test "returns 200 if user does not exist", %{conn: conn} do
      params = %{email: "user that does not exist"}

      conn = post(conn, "/api/password/forgot", params)

      assert json_response(conn, 200)
    end

    test "sends email to user if it exists and generats key", %{conn: conn} do
      user = Factory.create_user()
      params = %{email: user.email}

      conn = post(conn, "/api/password/forgot", params)

      assert json_response(conn, 200)

      user = Repo.get(User, user.id)

      assert_delivered_email(Nexpo.Email.reset_password(user))
      assert user.forgot_password_key != nil
    end
  end

  describe "POST /api/password/new/:key" do
    test "returns 404 given invalid key", %{conn: conn} do
      params = %{
        password: "random-string",
        password_confirmation: "random-string"
      }

      conn = post(conn, "/api/password/new/" <> "invalid-key", params)

      assert json_response(conn, 404)
    end

    test "returns 404 given old key", %{conn: conn} do
      user = Factory.create_user() |> User.forgot_password_changeset() |> Repo.update!()

      {_, time} =
        user.forgot_password_time
        |> DateTime.to_unix()
        |> Kernel.-(60 * 60)
        |> DateTime.from_unix()

      user = Ecto.Changeset.change(user, forgot_password_time: time) |> Repo.update!()

      params = %{
        password: "valid_password",
        password_confirmation: "valid_password"
      }

      conn = post(conn, "/api/password/new/" <> user.forgot_password_key, params)
      assert json_response(conn, 404)
    end

    test "return 200 given valid key", %{conn: conn} do
      user =
        Factory.create_user()
        |> User.forgot_password_changeset()
        |> Repo.update!()

      params = %{
        password: "random-string",
        password_confirmation: "random-string"
      }

      conn = post(conn, "/api/password/new/" <> user.forgot_password_key, params)

      assert json_response(conn, 200)
    end

    test "changes password given valid params", %{conn: conn} do
      user =
        Factory.create_user()
        |> User.forgot_password_changeset()
        |> Repo.update!()

      prev_hashed_password = user.hashed_password

      p = "random-string"

      params = %{
        password: p,
        password_confirmation: p
      }

      conn = post(conn, "/api/password/new/" <> user.forgot_password_key, params)

      user = Repo.get(User, user.id)
      assert json_response(conn, 200)
      assert user.forgot_password_key == nil
      assert user.hashed_password != prev_hashed_password
    end

    test "returns errors given invalid password", %{conn: conn} do
      user =
        Factory.create_user()
        |> User.forgot_password_changeset()
        |> Repo.update!()

      prev_hashed_password = user.hashed_password

      params = %{
        password: "any-password",
        password_confirmation: "any-other-password"
      }

      conn = post(conn, "/api/password/new/" <> user.forgot_password_key, params)

      user = Repo.get(User, user.id)
      assert json_response(conn, 400)
      response = Poison.decode!(conn.resp_body)

      assert response["type"] == "error"
      assert Map.has_key?(response, "errors")

      assert user.forgot_password_key != nil
      assert user.hashed_password == prev_hashed_password
    end
  end

  describe "GET /api/password/forgot/:key" do
    test "returns 200 given valid key", %{conn: conn} do
      user =
        Factory.create_user()
        |> User.forgot_password_changeset()
        |> Repo.update!()

      assert user.forgot_password_key != nil

      conn = get(conn, "/api/password/forgot/" <> user.forgot_password_key)

      assert json_response(conn, 200)
    end

    test "returns 404 given invalid key", %{conn: conn} do
      conn = get(conn, "/api/password/forgot/" <> "invalid-key")

      assert json_response(conn, 404)
    end

    test "returns 404 given old key", %{conn: conn} do
      user = Factory.create_user() |> User.forgot_password_changeset() |> Repo.update!()

      {_, time} =
        user.forgot_password_time
        |> DateTime.to_unix()
        |> Kernel.-(60 * 60)
        |> DateTime.from_unix()

      user = Ecto.Changeset.change(user, forgot_password_time: time) |> Repo.update!()

      conn = get(conn, "/api/password/forgot/" <> user.forgot_password_key)
      assert json_response(conn, 404)
    end
  end
end
