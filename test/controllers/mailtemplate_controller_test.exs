defmodule Nexpo.MailtemplateControllerTest do
  use Nexpo.ConnCase

  alias Nexpo.Mailtemplate
  @valid_attrs %{content: "some content", name: "some content", signature: "some content", subject: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  @tag :logged_in
  test "lists all entries on index", %{conn: conn} do
    conn = get conn, mailtemplate_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  @tag :logged_in
  test "shows chosen resource", %{conn: conn} do
    mailtemplate = Repo.insert! %Mailtemplate{}
    conn = get conn, mailtemplate_path(conn, :show, mailtemplate)
    assert json_response(conn, 200)["data"] == %{"id" => mailtemplate.id,
      "name" => mailtemplate.name,
      "subject" => mailtemplate.subject,
      "content" => mailtemplate.content,
      "signature" => mailtemplate.signature}
  end

  @tag :logged_in
  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, mailtemplate_path(conn, :show, -1)
    end
  end

  @tag :logged_in
  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, mailtemplate_path(conn, :create), mailtemplate: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Mailtemplate, @valid_attrs)
  end

  @tag :logged_in
  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, mailtemplate_path(conn, :create), mailtemplate: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    mailtemplate = Repo.insert! %Mailtemplate{}
    conn = put conn, mailtemplate_path(conn, :update, mailtemplate), mailtemplate: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Mailtemplate, @valid_attrs)
  end

  @tag :logged_in
  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    mailtemplate = Repo.insert! %Mailtemplate{}
    conn = put conn, mailtemplate_path(conn, :update, mailtemplate), mailtemplate: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "deletes chosen resource", %{conn: conn} do
    mailtemplate = Repo.insert! %Mailtemplate{}
    conn = delete conn, mailtemplate_path(conn, :delete, mailtemplate)
    assert response(conn, 204)
    refute Repo.get(Mailtemplate, mailtemplate.id)
  end
end
