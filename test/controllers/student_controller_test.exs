defmodule Nexpo.StudentControllerTest do
  use Nexpo.ConnCase

  alias Nexpo.{Student, User}
  @valid_attrs %{resume_en_url: nil, resume_sv_url: nil, year: 42, user_id: -1 }
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
      "resume_sv_url" => student.resume_sv_url,
      "student_sessions" => [],
      "student_session_applications" => []}
  end

  @tag :logged_in
  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, student_path(conn, :show, -1)
    end
  end

  @tag :logged_in
  test "creates and renders resource when data is valid", %{conn: conn} do
    user = Repo.insert! %User{email: "dev@it"}
    attrs = %{@valid_attrs | user_id: user.id}
    conn = post conn, student_path(conn, :create), student: attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Student, %{user_id: user.id})
  end

  @tag :logged_in
  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, student_path(conn, :create), student: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    user = Repo.insert! %User{email: "dev@it"}
    student = Repo.insert! %Student{}
    attrs = %{@valid_attrs | user_id: user.id}
    conn = put conn, student_path(conn, :update, student), student: attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Student, %{user_id: user.id})
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

  @tag :logged_in
  test "update student with resume_sv_url and resume_sv_url", %{conn: conn}do
    resume_sv_url = %Plug.Upload{path: "test/assets/placeholder.pdf", filename: "placeholder.pdf"}
    resume_en_url = %Plug.Upload{path: "test/assets/placeholder.pdf", filename: "placeholder.pdf"}
    user = Repo.insert! %User{email: "dev@it"}
    student = Repo.insert! %Student{}
    attrs = %{@valid_attrs | user_id: user.id , resume_sv_url: resume_sv_url , resume_en_url: resume_en_url }
    conn = put conn, student_path(conn, :update, student), student: attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Student, %{user_id: user.id})
  end

  @tag :logged_in
  test "update student with cv that is not pdf gives error", %{conn: conn}do
    resume_sv_url = %Plug.Upload{path: "test/assets/placeholder.png", filename: "placeholder.png"}
    user = Repo.insert! %User{email: "dev@it"}
    student = Repo.insert! %Student{}
    attrs = %{@valid_attrs | user_id: user.id , resume_sv_url: resume_sv_url }
    conn = put conn, student_path(conn, :update, student), student: attrs
    assert json_response(conn, 422)["errors"] != %{}
  end
end
