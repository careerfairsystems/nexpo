defmodule Nexpo.UsersAcceptanceTest do
  use Nexpo.ConnCase
  use Bamboo.Test

  alias Nexpo.Repo
  alias Nexpo.User

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "GET /initial_signup/:key returns a user given a valid key", %{conn: conn} do
    params = Factory.params_for(:initial_signup)
    user = User.initial_signup!(params)

    conn = get(conn, "/api/initial_signup/#{user.signup_key}")

    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]

    assert response["id"] == user.id
  end

  test "GET /initial_signup/:key returns 404 given an invalid key", %{conn: conn} do

    conn = get(conn, "/api/initial_signup/invalid key")

    assert json_response(conn, 404)
  end

  test "POST /initial_signup accepts usernames that are not already signed up", %{conn: conn} do
    params = Factory.params_for(:initial_signup)
    conn = post(conn, "/api/initial_signup", params)

    assert json_response(conn, 201)
  end

  test "POST /initial_signup rejects usernames that are already signed up", %{conn: conn} do
    params = Factory.params_for(:initial_signup)
    user_params = Factory.params_for(:user, email: params.username <> "@student.lu.se")
    User.changeset(%User{}, user_params) |> Repo.insert

    conn = post(conn, "/api/initial_signup", params)

    assert json_response(conn, 400)
  end

  test "POST /initial_signup sends an email on success", %{conn: conn} do
    params = Factory.params_for(:initial_signup)
    conn = post(conn, "/api/initial_signup", params)

    assert json_response(conn, 201)

    user = Repo.get_by!(User, email: params.username <> "@student.lu.se")

    assert_delivered_email Nexpo.Email.pre_signup_email(user)
  end

  test "POST /final_signup/:key fails given invalid passwords", %{conn: conn} do
    params = Factory.params_for(:initial_signup)
    user = User.initial_signup!(params)

    params = Factory.params_for(:final_signup)
    params = Map.put(params, :passwordConfirmation, params.password <> "invalid")

    conn = post(conn, "/api/final_signup/#{user.signup_key}", params)

    assert json_response(conn, 400)
  end

  test "POST /final_signup/:key fails given invalid signup_key", %{conn: conn} do
    params = Factory.params_for(:initial_signup)
    user = User.initial_signup!(params)

    params = Factory.params_for(:final_signup)
    params = Map.put(params, :passwordConfirmation, params.password)

    conn = post(conn, "/api/final_signup/#{user.signup_key}invalid", params)

    assert json_response(conn, 404)
  end

  test "POST /final_signup/:key returns user on success and sends an email", %{conn: conn} do
    params = Factory.params_for(:initial_signup)
    user = User.initial_signup!(params)

    params = Factory.params_for(:final_signup)

    conn = post(conn, "/api/final_signup/#{user.signup_key}", params)

    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]

    assert response["id"] == user.id

    assert_delivered_email Nexpo.Email.completed_sign_up_mail(user)
  end

end
