defmodule Nexpo.CategoriesAcceptanceTest do
  use Nexpo.ConnCase

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "GET /categories returns all categories", %{conn: conn} do
    company_categories = Factory.insert_list(3, :company_category)
    conn = conn |> get("/api/categories")

    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]
    assert length(response) == length(company_categories)
  end

  test "GET /categories always attributes as a key", %{conn: conn} do
    init_cats = Factory.insert_list(3, :company_category)
    Factory.insert_list(2, :company_attribute, %{category: Enum.at(init_cats, 0)})

    conn = conn |> get("/api/categories")
    assert json_response(conn, 200)
    response_cats = Poison.decode!(conn.resp_body)["data"]

    # Test existence of all attributes lists
    Enum.each(response_cats, fn res_cat ->
      assert Map.has_key?(res_cat, "attributes")
    end)
  end

  test "GET /categories returns empty list if there are no categories", %{conn: conn} do
    conn = conn |> get("/api/categories")
    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]
    assert length(response) == 0
  end

end
