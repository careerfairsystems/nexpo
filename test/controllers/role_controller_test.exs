defmodule Nexpo.RoleControllerTest do
  use Nexpo.ConnCase

  alias Nexpo.Role
  @valid_attrs %{type: "some content", permissions: ["read_all", "write_all"]}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  @tag :logged_in
  test "lists all entries on index", %{conn: conn} do
    conn = get conn, role_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  @tag :logged_in
  test "shows chosen resource", %{conn: conn} do
    role = Repo.insert! %Role{}
    conn = get conn, role_path(conn, :show, role)
    assert json_response(conn, 200)["data"] == %{"id" => role.id,
      "type" => role.type, "permissions" => []}
  end

  @tag :logged_in
  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, role_path(conn, :show, -1)
    end
  end

  @tag :logged_in
  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, role_path(conn, :create), role: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Role, @valid_attrs)
  end

  @tag :logged_in
  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, role_path(conn, :create), role: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    role = Repo.insert! %Role{}
    conn = put conn, role_path(conn, :update, role), role: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Role, @valid_attrs)
  end

  @tag :logged_in
  test "updates and renders chosen resource with user ids", %{conn: conn} do
    role = Repo.insert! %Role{}
    user = Factory.create_user()
    attrs = %{type: "type", user_ids: [user.id]}
    conn = put conn, role_path(conn, :update, role), role: attrs
    assert json_response(conn, 200)["data"]["id"]
    role = Role |> Repo.get_by(%{type: "type"})
    assert role
    assert length(Map.get(role |> Repo.preload(:users), :users)) == 1
  end

  @tag :logged_in
  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    role = Repo.insert! %Role{}
    conn = put conn, role_path(conn, :update, role), role: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "deletes chosen resource", %{conn: conn} do
    role = Repo.insert! %Role{}
    conn = delete conn, role_path(conn, :delete, role)
    assert response(conn, 204)
    refute Repo.get(Role, role.id)
  end
end
