defmodule Nexpo.CompaniesAcceptanceTest do
  use Nexpo.ConnCase

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "GET /companies returns all companies", %{conn: conn} do
    companies = Factory.insert_list(3, :company)
    conn = conn |> get("/api/companies")

    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]
    assert length(response) == length(companies)
  end

  test "GET /companies returns empty list if there are no companies", %{conn: conn} do
    conn = conn |> get("/api/companies")

    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]
    assert length(response) == 0
  end

  test "GET /companies/:id returns categories and attributes nested", %{conn: conn} do
    # Create the structure
    categories = Factory.insert_list(3, :company_category)
    Factory.insert_list(2, :company_attribute, %{category: Enum.at(categories, 0)})
    Factory.insert_list(3, :company_attribute, %{category: Enum.at(categories, 1)})
    Factory.insert_list(4, :company_attribute, %{category: Enum.at(categories, 2)})

    # Create company without any entries
    company = Factory.insert(:company)

    conn = conn |> get("/api/companies/#{company.id}")
    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]

    res_categories = Map.get(response, "categories")
    assert length(res_categories) == length(categories)

    Enum.each(res_categories, fn res_cat ->
      res_attrs = Map.get(res_cat, "attributes")
      refute Enum.empty?(res_attrs)
    end)
  end

  test "GET /companies contains emails", %{conn: conn} do
    companies = Factory.insert_list(3, :company)
    conn = conn |> get("/api/companies")
    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]
    assert length(companies) == length(response)
    Enum.each(response, fn res ->
      assert Map.has_key?(res, "email")
    end)
  end

end
