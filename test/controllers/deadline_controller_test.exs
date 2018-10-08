defmodule Nexpo.DeadlineControllerTest do
  use Nexpo.ConnCase

  alias Nexpo.Deadline
  @valid_attrs %{end: %{day: 17, month: 4, year: 2010}, name: "some content", start: %{day: 17, month: 4, year: 2010}}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  @tag :logged_in
  test "lists all entries on index", %{conn: conn} do
    conn = get conn, deadline_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  @tag :logged_in
  test "shows chosen resource", %{conn: conn} do
    deadline = Repo.insert! %Deadline{}
    conn = get conn, deadline_path(conn, :show, deadline)
    assert json_response(conn, 200)["data"] == %{"id" => deadline.id,
      "name" => deadline.name,
      "start" => deadline.start,
      "end" => deadline.end}
  end

  @tag :logged_in
  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, deadline_path(conn, :show, -1)
    end
  end

  @tag :logged_in
  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, deadline_path(conn, :create), deadline: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Deadline, @valid_attrs)
  end

  @tag :logged_in
  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, deadline_path(conn, :create), deadline: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    deadline = Repo.insert! %Deadline{}
    conn = put conn, deadline_path(conn, :update, deadline), deadline: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Deadline, @valid_attrs)
  end

  @tag :logged_in
  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    deadline = Repo.insert! %Deadline{}
    conn = put conn, deadline_path(conn, :update, deadline), deadline: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "deletes chosen resource", %{conn: conn} do
    deadline = Repo.insert! %Deadline{}
    conn = delete conn, deadline_path(conn, :delete, deadline)
    assert response(conn, 204)
    refute Repo.get(Deadline, deadline.id)
  end
end
