defmodule Nexpo.ProgrammeControllerTest do
  use Nexpo.ConnCase

  alias Nexpo.Programme
  @valid_attrs %{code: "some content", name: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, programme_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    programme = Repo.insert! %Programme{}
    conn = get conn, programme_path(conn, :show, programme)
    assert json_response(conn, 200)["data"] == %{"id" => programme.id,
      "code" => programme.code,
      "name" => programme.name}
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, programme_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, programme_path(conn, :create), programme: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Programme, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, programme_path(conn, :create), programme: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    programme = Repo.insert! %Programme{}
    conn = put conn, programme_path(conn, :update, programme), programme: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Programme, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    programme = Repo.insert! %Programme{}
    conn = put conn, programme_path(conn, :update, programme), programme: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    programme = Repo.insert! %Programme{}
    conn = delete conn, programme_path(conn, :delete, programme)
    assert response(conn, 204)
    refute Repo.get(Programme, programme.id)
  end
end
