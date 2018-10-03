defmodule Nexpo.JobOfferControllerTest do
  use Nexpo.ConnCase

  alias Nexpo.JobOffer
  @valid_attrs %{type: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  @tag :logged_in
  test "lists all entries on index", %{conn: conn} do
    conn = get conn, job_offer_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  @tag :logged_in
  test "shows chosen resource", %{conn: conn} do
    job_offer = Repo.insert! %JobOffer{}
    conn = get conn, job_offer_path(conn, :show, job_offer)
    assert json_response(conn, 200)["data"] == %{"id" => job_offer.id,
      "type" => job_offer.type}
  end

  @tag :logged_in
  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, job_offer_path(conn, :show, -1)
    end
  end

  @tag :logged_in
  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, job_offer_path(conn, :create), job_offer: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(JobOffer, @valid_attrs)
  end

  @tag :logged_in
  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, job_offer_path(conn, :create), job_offer: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    job_offer = Repo.insert! %JobOffer{}
    conn = put conn, job_offer_path(conn, :update, job_offer), job_offer: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(JobOffer, @valid_attrs)
  end

  @tag :logged_in
  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    job_offer = Repo.insert! %JobOffer{}
    conn = put conn, job_offer_path(conn, :update, job_offer), job_offer: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :logged_in
  test "deletes chosen resource", %{conn: conn} do
    job_offer = Repo.insert! %JobOffer{}
    conn = delete conn, job_offer_path(conn, :delete, job_offer)
    assert response(conn, 204)
    refute Repo.get(JobOffer, job_offer.id)
  end
end
