defmodule Nexpo.CompanyControllerTest do
  use Nexpo.ConnCase

  alias Nexpo.Company

  @valid_attrs %{
    description: "some content",
    logo_url: nil,
    name: "some content",
    website: "some content"
  }
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  @tag :logged_in
  test "lists all entries on index", %{conn: conn} do
    conn = get(conn, company_path(conn, :index))
    assert json_response(conn, 200)["data"] == []
  end

  @tag :logged_in
  test "shows chosen resource", %{conn: conn} do
    company = Repo.insert!(%Company{})
    conn = get(conn, company_path(conn, :show, company))

    assert json_response(conn, 200)["data"] == %{
             "id" => company.id,
             "name" => company.name,
             "logo_url" => company.logo_url,
             "description" => company.description,
             "website" => company.website,
             "student_session_days" => company.student_session_days,
             "entries" => [],
             "users" => [],
             "student_session_applications" => [],
             "top_students" => [],
             "student_session_time_slots" => [],
             "host_mail" => nil,
             "host_name" => nil,
             "host_phone_number" => nil
           }
  end

  @tag :logged_in
  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent(404, fn ->
      get(conn, company_path(conn, :show, -1))
    end)
  end

  @tag :logged_in
  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post(conn, company_path(conn, :create), company: @valid_attrs)
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Company, %{name: @valid_attrs.name})
  end

  @tag :logged_in
  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post(conn, company_path(conn, :create), company: @invalid_attrs)
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    company = Repo.insert!(%Company{})
    conn = put(conn, company_path(conn, :update, company), company: @valid_attrs)
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Company, %{name: @valid_attrs.name})
  end

  @tag :logged_in
  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    company = Repo.insert!(%Company{})
    conn = put(conn, company_path(conn, :update, company), company: @invalid_attrs)
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "deletes chosen resource", %{conn: conn} do
    company = Repo.insert!(%Company{})
    conn = delete(conn, company_path(conn, :delete, company))
    assert response(conn, 204)
    refute Repo.get(Company, company.id)
  end

  @tag :logged_in
  test "create company with logo_url and upload image", %{conn: conn} do
    logo_url = %Plug.Upload{path: "test/assets/placeholder.png", filename: "placeholder.png"}
    attrs = %{@valid_attrs | logo_url: logo_url}
    conn = post(conn, company_path(conn, :create), company: attrs)
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Company, %{name: @valid_attrs.name})
  end

  @tag :logged_in
  test "create company with invalid file format gives error", %{conn: conn} do
    logo_url = %Plug.Upload{path: "test/assets/placeholder.pdf", filename: "placeholder.pdf"}
    attrs = %{@valid_attrs | logo_url: logo_url}
    conn = post(conn, company_path(conn, :create), company: attrs)
    assert json_response(conn, 422)["errors"] != %{}
  end
end
