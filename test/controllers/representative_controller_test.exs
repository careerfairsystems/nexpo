defmodule Nexpo.RepresentativeControllerTest do
  use Nexpo.ConnCase

  alias Nexpo.{Representative, User, Company}
  @valid_attrs %{user_id: -1, company_id: -1}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  @tag :logged_in
  test "lists all entries on index", %{conn: conn} do
    conn = get(conn, representative_path(conn, :index))
    assert json_response(conn, 200)["data"] == []
  end

  @tag :logged_in
  test "shows chosen resource", %{conn: conn} do
    representative = Repo.insert!(%Representative{})
    conn = get(conn, representative_path(conn, :show, representative))

    assert json_response(conn, 200)["data"] == %{
             "id" => representative.id,
             "company_id" => representative.company_id,
             "user_id" => representative.user_id
           }
  end

  @tag :logged_in
  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent(404, fn ->
      get(conn, representative_path(conn, :show, -1))
    end)
  end

  @tag :logged_in
  test "creates and renders resource when data is valid", %{conn: conn} do
    user = Repo.insert!(%User{email: "dev@it"})
    company = Repo.insert!(%Company{name: "Company"})
    attrs = %{@valid_attrs | user_id: user.id, company_id: company.id}
    conn = post(conn, representative_path(conn, :create), representative: attrs)
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Representative, attrs)
  end

  @tag :logged_in
  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post(conn, representative_path(conn, :create), representative: @invalid_attrs)
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    user = Repo.insert!(%User{email: "dev@it"})
    company = Repo.insert!(%Company{name: "Company"})
    attrs = %{@valid_attrs | user_id: user.id, company_id: company.id}
    representative = Repo.insert!(%Representative{user_id: user.id, company_id: company.id})
    conn = put(conn, representative_path(conn, :update, representative), representative: attrs)
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Representative, attrs)
  end

  @tag :logged_in
  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    representative = Repo.insert!(%Representative{})

    conn =
      put(conn, representative_path(conn, :update, representative), representative: @invalid_attrs)

    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "deletes chosen resource", %{conn: conn} do
    representative = Repo.insert!(%Representative{})
    conn = delete(conn, representative_path(conn, :delete, representative))
    assert response(conn, 204)
    refute Repo.get(Representative, representative.id)
  end
end
