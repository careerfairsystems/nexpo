defmodule Nexpo.SignupAcceptanceTest do
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

  test "POST /initial_signup accepts emails that are not already signed up", %{conn: conn} do
    params = Factory.params_for(:initial_signup)
    conn = post(conn, "/api/initial_signup", params)

    assert json_response(conn, 201)
  end

  test "POST /initial_signup lower cases email", %{conn: conn} do
    params = Factory.params_for(:initial_signup)

    incorrect_email = String.upcase(params.email)

    correct_email = params.email |> String.trim |> String.downcase
    email = correct_email

    params = Map.put(params, :email, incorrect_email)

    conn = post(conn, "/api/initial_signup", params)

    assert json_response(conn, 201)

    user = Repo.get_by!(User, email: email)

    assert user != nil
    assert user.email == email
  end

  test "POST /initial_signup does not allow emails with blankspace", %{conn: conn} do
    params = Factory.params_for(:initial_signup)

    incorrect_emails = "  " <> params.email <> "  "

    correct_emails = params.email |> String.trim |> String.downcase
    email = correct_emails

    params = Map.put(params, :email, incorrect_emails)

    conn = post(conn, "/api/initial_signup", params)

    assert json_response(conn, 400)

    user = Repo.get_by(User, email: email)

    assert user == nil
  end

  test "POST /initial_signup rejects empty emails", %{conn: conn} do
    params = Factory.params_for(:initial_signup, email: "")

    conn = post(conn, "/api/initial_signup", params)

    assert json_response(conn, 400)
  end

  test "POST /initial_signup rejects emails that are already signed up", %{conn: conn} do
    params = Factory.params_for(:initial_signup)
    User.initial_signup!(params)

    conn = post(conn, "/api/initial_signup", params)

    assert json_response(conn, 400)
  end

  test "POST /initial_signup sends an email on success", %{conn: conn} do
    params = Factory.params_for(:initial_signup)
    conn = post(conn, "/api/initial_signup", params)

    assert json_response(conn, 201)

    email = params.email
    user = Repo.get_by!(User, email: email)

    assert_delivered_email Nexpo.Email.pre_signup_email(user)
  end

  test "POST /final_signup/:key fails given no passwords", %{conn: conn} do
    params = Factory.params_for(:initial_signup)
    user = User.initial_signup!(params)

    params = Factory.params_for(:final_signup) |> Map.drop([:password, :password_confirmation])

    conn = post(conn, "/api/final_signup/#{user.signup_key}", params)

    assert json_response(conn, 400)
  end

  test "POST /final_signup/:key fails given no to short password", %{conn: conn} do
    params = Factory.params_for(:initial_signup)
    user = User.initial_signup!(params)

    params = Factory.params_for(:final_signup)
    |> Map.put(:password, "short")
    |> Map.put(:password_confirmation, "short")

    conn = post(conn, "/api/final_signup/#{user.signup_key}", params)

    assert json_response(conn, 400)
  end

  test "POST /final_signup/:key fails given non-matching passwords", %{conn: conn} do
    params = Factory.params_for(:initial_signup)
    user = User.initial_signup!(params)

    params = Factory.params_for(:final_signup)
    params = Map.put(params, :password_confirmation, params.password <> "invalid")

    conn = post(conn, "/api/final_signup/#{user.signup_key}", params)

    assert json_response(conn, 400)
  end

  test "POST /final_signup/:key fails given invalid signup_key", %{conn: conn} do
    params = Factory.params_for(:initial_signup)
    user = User.initial_signup!(params)

    params = Factory.params_for(:final_signup)

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

    user = Repo.get!(User, user.id) |> Repo.preload(:student)

    # Assert id and email in response
    assert response["id"] != nil
    assert response["email"] != nil

    # Assert correct data in response
    assert response["id"] == user.id
    assert response["email"] == user.email
    assert response["first_name"] == params.first_name
    assert response["last_name"] == params.last_name

    # Assert sign_up key has been destroyed
    assert user.signup_key == nil

    # Assert student has been created
    assert user.student.id

    assert_delivered_email Nexpo.Email.completed_sign_up_mail(user)
  end

end
