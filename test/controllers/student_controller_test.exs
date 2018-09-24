defmodule Nexpo.StudentControllerTest do
  use Nexpo.ConnCase

  alias Nexpo.{Student, User}
  @valid_attrs %{resume_en_url: "some content", resume_sv_url: "some content", year: 42, user_id: -1 }
  @invalid_attrs %{}

  setup %{conn: conn} do
    Repo.insert!(%User{email: "bla", password: "nooo"})
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  @tag :logged_in
  test "lists all entries on index", %{conn: conn} do
    conn = get conn, student_path(conn, :index)
    assert length(json_response(conn, 200)["data"]) == 1
  end

  @tag :logged_in
  test "shows chosen resource", %{conn: conn} do
    student = Repo.insert! %Student{}
    conn = get conn, student_path(conn, :show, student)
    assert json_response(conn, 200)["data"] == %{"id" => student.id,
      "user_id" => student.user_id,
      "year" => student.year,
      "resume_en_url" => student.resume_en_url,
      "resume_sv_url" => student.resume_sv_url}
  end

  @tag :logged_in
  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, student_path(conn, :show, -1)
    end
  end

  @tag :logged_in
  test "creates and renders resource when data is valid", %{conn: conn} do
    user = Factory.create_user()
    attrs = %{@valid_attrs | user_id: user.id}
    conn = post conn, student_path(conn, :create), student: attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Student, attrs)
  end

  @tag :logged_in
  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, student_path(conn, :create), student: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    user = Factory.create_user()
    student = Repo.insert! %Student{}
    attrs = %{@valid_attrs | user_id: user.id}
    conn = put conn, student_path(conn, :update, student), student: attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Student, attrs)
  end

  @tag :logged_in
  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    student = Repo.insert! %Student{}
    conn = put conn, student_path(conn, :update, student), student: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "deletes chosen resource", %{conn: conn} do
    student = Repo.insert! %Student{}
    conn = delete conn, student_path(conn, :delete, student)
    assert response(conn, 204)
    refute Repo.get(Student, student.id)
  end
end
