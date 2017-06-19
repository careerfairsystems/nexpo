defmodule Nexpo.CompaniesAcceptanceTest do
  use Nexpo.ConnCase

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "/companies returns all companies", %{conn: conn} do
    companies = Factory.insert_list(3, :company)
    conn = conn |> get("/api/companies")

    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]
    assert length(response) == length(companies)
  end

  test "/companies returns empty list if there are no companies", %{conn: conn} do
    conn = conn |> get("/api/companies")

    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]
    assert length(response) == 0
  end

  test "/companies/:id returns the entire company structure even if company does not have all entries", %{conn: conn} do
    # Create the structure
    categories = Factory.insert_list(3, :company_category)
    attributes_1 = Factory.insert_list(2, :company_attribute, %{category: Enum.at(categories, 0)})
    attributes_2 = Factory.insert_list(3, :company_attribute, %{category: Enum.at(categories, 1)})
    attributes_3 = Factory.insert_list(4, :company_attribute, %{category: Enum.at(categories, 2)})

    # Create company without any entries
    company = Factory.insert(:company)

    conn = conn |> get("/api/companies/#{company.id}")

    assert json_response(conn, 200)

    response = Poison.decode!(conn.resp_body)["data"]

    # Test category names
    company_keys = Factory.build(:company) |> Map.keys |> Enum.map( &to_string(&1) )
    res_category_names = response |> Map.drop(company_keys) |> Map.keys
    assert length(res_category_names) != 0
    category_names = categories |> Enum.map( &(&1.title) ) |> Enum.map( &to_string(&1) )
    assert res_category_names -- category_names == []

    # Test attributes in categories
    # Category 1
    res_attribute_names = response |> Map.get( Enum.at(categories, 0) |> Map.get(:title) ) |> Map.keys
    attribute_names = attributes_1 |> Enum.map( &(&1.title) ) |> Enum.map( &to_string(&1) )
    assert res_attribute_names -- attribute_names == []

    # Category 2
    res_attribute_names = response |> Map.get( Enum.at(categories, 1) |> Map.get(:title) ) |> Map.keys
    attribute_names = attributes_2 |> Enum.map( &(&1.title) ) |> Enum.map( &to_string(&1) )
    assert res_attribute_names -- attribute_names == []

    # Category 3
    res_attribute_names = response |> Map.get( Enum.at(categories, 2) |> Map.get(:title) ) |> Map.keys
    attribute_names = attributes_3 |> Enum.map( &(&1.title) ) |> Enum.map( &to_string(&1) )
    assert res_attribute_names -- attribute_names == []

  end

  test "/companies can contain an email", %{conn: conn} do
    companies = Factory.insert_list(3, :company)
    conn = conn |> get("/api/companies")
    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]
    assert length(companies) == length(response)
    #assert response == nil
    emails = Enum.map(response, fn entry -> Map.get(entry, "email") end)
    assert Enum.map(emails, fn email -> String.contains?(email, "Generated@email.com") end)
  end

end
