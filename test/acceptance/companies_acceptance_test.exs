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

  test "GET /companies/:id returns the entire company structure even if company does not have all entries", %{conn: conn} do
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
    res_categories = response |> Map.get("categories")
    assert length(res_categories) == length(categories)
    categories_titles = Enum.map(categories, fn c -> c.title end)
    res_categories |> Enum.map(fn c ->
      assert Enum.member?(categories_titles, c.title)
    end)
    # company_keys = Factory.build(:company) |> Map.keys |> Enum.map( &to_string(&1) )
    # res_category_names = response |> Map.drop(company_keys) |> Map.keys
    # assert length(res_category_names) != 0
    # category_names = categories |> Enum.map( &(&1.title) ) |> Enum.map( &to_string(&1) )
    # assert res_category_names -- category_names == []

    # Test attributes in categories
    # Category 1
    current_cat = Enum.at(categories, 0)
    res_attributes = response |> Map.get(:categories) |> Enum.find(fn a -> a.title == current_cat.title end)
    assert length(res_attributes) == length(attributes_1)

    # Category 2
    current_cat = Enum.at(categories, 1)
    res_attributes = response |> Map.get(:categories) |> Enum.find(fn a -> a.title == current_cat.title end)
    assert length(res_attributes) == length(attributes_2)

    # Category 3
    current_cat = Enum.at(categories, 2)
    res_attributes = response |> Map.get(:categories) |> Enum.find(fn a -> a.title == current_cat.title end)
    assert length(res_attributes) == length(attributes_3)

    # Test attributes in categories
    # Category 1
    # res_attribute_names = response |> Map.get( Enum.at(categories, 0) |> Map.get(:title) ) |> Map.keys
    # attribute_names = attributes_1 |> Enum.map( &(&1.title) ) |> Enum.map( &to_string(&1) )
    # assert res_attribute_names -- attribute_names == []

    # Category 2
    # res_attribute_names = response |> Map.get( Enum.at(categories, 1) |> Map.get(:title) ) |> Map.keys
    # attribute_names = attributes_2 |> Enum.map( &(&1.title) ) |> Enum.map( &to_string(&1) )
    # assert res_attribute_names -- attribute_names == []

    # Category 3
    # res_attribute_names = response |> Map.get( Enum.at(categories, 2) |> Map.get(:title) ) |> Map.keys
    # attribute_names = attributes_3 |> Enum.map( &(&1.title) ) |> Enum.map( &to_string(&1) )
    # assert res_attribute_names -- attribute_names == []

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

  # test "POST /companies with valid params work", %{conn: conn} do
  #   conn = conn |> post("/api/companies", %{name: "Test Company 1"})
  #   assert json_response(conn, 201)
  #   conn = conn |> post("/api/companies", %{name: "Test Company 2"})
  #   assert json_response(conn, 201)
  #   conn = conn |> post("/api/companies", %{name: "Test Company 3"})
  #   assert json_response(conn, 201)

  #   conn = conn |> get("/api/companies")
  #   assert json_response(conn, 200)
  #   response = Poison.decode!(conn.resp_body)["data"]

  #   assert length(response) == 3
  #   assert Enum.map(response, fn entry -> String.contains?(entry["name"], "Test Company") end)

  #   conn = conn |> post("/api/companies", %{name: "Test Company 4", email: "Best1@email.com"})
  #   assert json_response(conn, 201)
  #   conn = conn |> post("/api/companies", %{name: "Test Company 5", email: "Best2@email.com"})
  #   assert json_response(conn, 201)
  #   conn = conn |> post("/api/companies", %{name: "Test Company 6", email: "Best3@email.com"})
  #   assert json_response(conn, 201)

  #   conn = conn |> get("/api/companies")
  #   assert json_response(conn, 200)
  #   response = Poison.decode!(conn.resp_body)["data"]
  #   assert Enum.map(response, fn entry ->
  #     case entry["email"] do
  #       nil -> true
  #       _ -> String.contains?(entry["email"], "@email.com")
  #     end
  #   end)

  # end

  # test "POST /companies with empty params do not work", %{conn: conn} do
  #   conn = conn |> post("/api/companies", %{name: ""})
  #       assert json_response(conn, 422)
  # end

  # test "POST /companies with invalid params do not work", %{conn: conn} do
  #   conn = conn |> post("/api/companies", %{nameless: "Test Company"})
  #   assert json_response(conn, 422)
  #   conn = conn |> post("/api/companies", %{email: "an email without company name"})
  #   assert json_response(conn, 422)
  # end

  # test "POST /companies email and company must be unique. Email defaults to nil", %{conn: conn} do
  #   conn = conn |> post("/api/companies", %{name: "Test Company 1"})
  #   assert json_response(conn, 201)
  #   conn = conn |> post("/api/companies", %{name: "Test Company 1"})
  #   assert json_response(conn, 422)
  #   conn = conn |> post("/api/companies", %{name: "Test Company 2", email: "Best@email.com"})
  #   assert json_response(conn, 201)
  #   conn = conn |> post("/api/companies", %{name: "Test Company 3", email: "Best@email.com"})
  #   assert json_response(conn, 201)
  #   conn = conn |> get("/api/companies/3")
  #   assert json_response(conn, 200)
  #   response = Poison.decode!(conn.resp_body)["data"]

  #   assert response["email"] == nil
  # end

end
