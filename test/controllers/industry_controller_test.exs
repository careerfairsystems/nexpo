defmodule Nexpo.IndustryControllerTest do
  use Nexpo.ConnCase

  alias Nexpo.Industry
  @valid_attrs %{name: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  @tag :logged_in
  test "lists all entries on index", %{conn: conn} do
    conn = get conn, industry_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  @tag :logged_in
  test "shows chosen resource", %{conn: conn} do
    industry = Repo.insert! %Industry{}
    conn = get conn, industry_path(conn, :show, industry)
    assert json_response(conn, 200)["data"] == %{"id" => industry.id,
      "name" => industry.name}
  end

  @tag :logged_in
  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, industry_path(conn, :show, -1)
    end
  end

  @tag :logged_in
  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, industry_path(conn, :create), industry: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Industry, @valid_attrs)
  end

  @tag :logged_in
  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, industry_path(conn, :create), industry: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    industry = Repo.insert! %Industry{}
    conn = put conn, industry_path(conn, :update, industry), industry: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Industry, @valid_attrs)
  end

  @tag :logged_in
  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    industry = Repo.insert! %Industry{}
    conn = put conn, industry_path(conn, :update, industry), industry: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "deletes chosen resource", %{conn: conn} do
    industry = Repo.insert! %Industry{}
    conn = delete conn, industry_path(conn, :delete, industry)
    assert response(conn, 204)
    refute Repo.get(Industry, industry.id)
  end
end
