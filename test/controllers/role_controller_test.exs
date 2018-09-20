defmodule Nexpo.RoleControllerTest do
  use Nexpo.ConnCase

  alias Nexpo.Role
  @valid_attrs %{type: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, role_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    role = Repo.insert! %Role{}
    conn = get conn, role_path(conn, :show, role)
    assert json_response(conn, 200)["data"] == %{"id" => role.id,
      "type" => role.type, "permissions" => []}
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, role_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, role_path(conn, :create), role: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Role, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, role_path(conn, :create), role: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    role = Repo.insert! %Role{}
    conn = put conn, role_path(conn, :update, role), role: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Role, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    role = Repo.insert! %Role{}
    conn = put conn, role_path(conn, :update, role), role: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    role = Repo.insert! %Role{}
    conn = delete conn, role_path(conn, :delete, role)
    assert response(conn, 204)
    refute Repo.get(Role, role.id)
  end
end
