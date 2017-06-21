defmodule Nexpo.CategoriesAcceptanceTest do
  use Nexpo.ConnCase

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "GET /categories returns all companies", %{conn: conn} do
    company_categories = Factory.insert_list(3, :company_category)
    conn = conn |> get("/api/categories")

    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]
    assert length(response) == length(company_categories)
    assert Enum.count(response) == 3
    assert Enum.map(response, fn entry -> Map.keys(entry) |> Enum.map(&String.contains?(&1, "Generated Category")) end)
  end

  test "GET /categories returns attributes correctly", %{conn: conn} do
    #Check the first attribute
    company_categories = Factory.insert_list(3, :company_category)
    Factory.insert_list(2, :company_attribute, %{category: Enum.at(company_categories, 0)})
    conn = conn |> get("/api/categories")
    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]

    company_categories = Enum.map(response, &Map.keys(&1) |> Enum.filter(fn entry -> not String.contains?(entry, "id") end))
    assert length(company_categories) == 3
    assert Enum.map(company_categories, fn category_list -> Enum.map(category_list, &String.contains?(&1, "Generated Category")) end)

    string_keys = Enum.map(company_categories, &List.to_string(&1))
    first_category = List.first(response)
    attributes = Enum.map(string_keys, fn key -> Map.get(first_category, key) end)
    |> Enum.filter(fn entry -> case entry do
      nil -> false
      _ -> true
      end
    end)
    attribute_keys = Map.keys(List.first(attributes))

    assert Enum.map(attribute_keys, &String.contains?(&1, "Generated Attribute"))
    meta_map_of_first_attribute = Map.get(List.first(attributes), List.first(attribute_keys))
    meta_map_keys = Map.keys(meta_map_of_first_attribute)
    assert Enum.map(meta_map_keys, fn key ->
      case key do
       "type" -> true
       "value" -> true
       _ -> false
      end
     end)
    assert Map.get(meta_map_of_first_attribute, "type") |> String.contains?("Generated type")
    assert Map.get(meta_map_of_first_attribute, "value") |> String.contains?("Generated value")
  end

  test "GET /categories returns empty list if there are no categories", %{conn: conn} do
    conn = conn |> get("/api/categories")
    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]
    assert length(response) == 0
  end


  test "POST /categories can insert a valid record", %{conn: conn} do
    conn = conn |> post("/api/categories", %{title: "TestCat"})
    assert json_response(conn, 201)

    conn = conn |> get("/api/categories")
    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]
    assert List.first(response) |> Map.keys() |> List.first()  == "TestCat"

   end

  test "POST /categories cannot insert an empty record", %{conn: conn} do
    conn = conn |> post("/api/categories", %{title: ""})
    assert json_response(conn, 422)
  end

  test "POST /categories cannot insert an invalid record", %{conn: conn} do
    conn = conn |> post("/api/categories", %{some_random_key: "Some random value"})
    assert json_response(conn, 422)
    conn = conn |> post("/api/categories", %{title: "A fully valid category", some_random_key: "Some random value"})
    response = Poison.decode!(conn.resp_body)["data"]
    assert Map.keys(response) |> List.first() == "A fully valid category"
    assert Map.keys(response) |> Enum.map(fn entry -> String.contains?(entry, "Some random value") end)
    assert json_response(conn, 201)
  end


end
