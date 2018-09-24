defmodule Nexpo.UserControllerTest do
  use Nexpo.ConnCase

  alias Nexpo.{User, Role}
  @valid_attrs %{first_name: "Test", last_name: "Test"}
  @invalid_attrs %{email: 123}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  @tag :logged_in
  test "lists all entries on index", %{conn: conn} do
    conn = get conn, user_path(conn, :index)
    assert length(json_response(conn, 200)["data"]) == 1
  end

  @tag :logged_in
  test "shows chosen resource", %{conn: conn} do
    user = Factory.create_user()
    conn = get conn, user_path(conn, :show, user)
    assert json_response(conn, 200)["data"] == %{"id" => user.id,
      "first_name" => user.first_name,
      "last_name" => user.last_name,
      "email" => user.email,
      "food_preferences" => user.food_preferences,
      "phone_number" => user.phone_number,
      "student" => %{
          "id" => user.student.id,
          "resume_en_url" => user.student.resume_en_url,
          "resume_sv_url" => user.student.resume_sv_url,
          "year" => nil,
          "user_id" => user.id
        }
      }
  end

  @tag :logged_in
  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, user_path(conn, :show, -1)
    end
  end

  @tag :logged_in
  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    user = Factory.create_user()
    conn = put conn, user_path(conn, :update, user), user: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(User, @valid_attrs)
  end

  @tag :logged_in
  test "updates and renders chosen resource with role_ids", %{conn: conn} do
    user = Factory.create_user()
    role = Repo.insert! %Role{}
    attrs = %{role_ids: [role.id]}
    conn = put conn, user_path(conn, :update, user), user: attrs
    assert json_response(conn, 200)["data"]["id"]
    user = Repo.get(User, user.id)
    assert user
    assert length(Map.get(user |> Repo.preload(:roles), :roles)) == 1
  end

  @tag :logged_in
  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    user = Factory.create_user()
    conn = put conn, user_path(conn, :update, user), user: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "deletes chosen resource", %{conn: conn} do
    user = Factory.create_user()
    conn = delete conn, user_path(conn, :delete, user)
    assert response(conn, 204)
    refute Repo.get(User, user.id)
  end
end
