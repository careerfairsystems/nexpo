defmodule Nexpo.StudentSessionTimeSlotControllerTest do
  use Nexpo.ConnCase

  alias Nexpo.StudentSessionTimeSlot
  @valid_attrs %{end: %{day: 17, hour: 14, min: 0, month: 4, sec: 0, year: 2010}, start: %{day: 17, hour: 14, min: 0, month: 4, sec: 0, year: 2010}, used: true}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, student_session_time_slot_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    student_session_time_slot = Repo.insert! %StudentSessionTimeSlot{}
    conn = get conn, student_session_time_slot_path(conn, :show, student_session_time_slot)
    assert json_response(conn, 200)["data"] == %{"id" => student_session_time_slot.id,
      "start" => student_session_time_slot.start,
      "end" => student_session_time_slot.end,
      "used" => student_session_time_slot.used}
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, student_session_time_slot_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, student_session_time_slot_path(conn, :create), student_session_time_slot: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(StudentSessionTimeSlot, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, student_session_time_slot_path(conn, :create), student_session_time_slot: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    student_session_time_slot = Repo.insert! %StudentSessionTimeSlot{}
    conn = put conn, student_session_time_slot_path(conn, :update, student_session_time_slot), student_session_time_slot: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(StudentSessionTimeSlot, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    student_session_time_slot = Repo.insert! %StudentSessionTimeSlot{}
    conn = put conn, student_session_time_slot_path(conn, :update, student_session_time_slot), student_session_time_slot: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    student_session_time_slot = Repo.insert! %StudentSessionTimeSlot{}
    conn = delete conn, student_session_time_slot_path(conn, :delete, student_session_time_slot)
    assert response(conn, 204)
    refute Repo.get(StudentSessionTimeSlot, student_session_time_slot.id)
  end
end
