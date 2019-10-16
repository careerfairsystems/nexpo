defmodule Nexpo.InterestControllerTest do
  use Nexpo.ConnCase

  alias Nexpo.Interest
  @valid_attrs %{name: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  @tag :logged_in
  test "lists all entries on index", %{conn: conn} do
    conn = get(conn, interest_path(conn, :index))
    assert json_response(conn, 200)["data"] == []
  end

  @tag :logged_in
  test "shows chosen resource", %{conn: conn} do
    interest = Repo.insert!(%Interest{})
    conn = get(conn, interest_path(conn, :show, interest))
    assert json_response(conn, 200)["data"] == %{"id" => interest.id, "name" => interest.name}
  end

  @tag :logged_in
  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent(404, fn ->
      get(conn, interest_path(conn, :show, -1))
    end)
  end

  @tag :logged_in
  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post(conn, interest_path(conn, :create), interest: @valid_attrs)
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Interest, @valid_attrs)
  end

  @tag :logged_in
  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post(conn, interest_path(conn, :create), interest: @invalid_attrs)
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    interest = Repo.insert!(%Interest{})
    conn = put(conn, interest_path(conn, :update, interest), interest: @valid_attrs)
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Interest, @valid_attrs)
  end

  @tag :logged_in
  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    interest = Repo.insert!(%Interest{})
    conn = put(conn, interest_path(conn, :update, interest), interest: @invalid_attrs)
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "deletes chosen resource", %{conn: conn} do
    interest = Repo.insert!(%Interest{})
    conn = delete(conn, interest_path(conn, :delete, interest))
    assert response(conn, 204)
    refute Repo.get(Interest, interest.id)
  end
end
