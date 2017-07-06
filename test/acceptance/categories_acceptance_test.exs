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

  # test "GET /categories returns attributes correctly", %{conn: conn} do
    # res_company_categories = Enum.map(response, &Map.keys(&1) |> Enum.filter(fn entry -> not String.contains?(entry, "id") end))
    # assert length(company_categories) == 3
    # assert Enum.map(company_categories, fn category_list -> Enum.map(category_list, &String.contains?(&1, "Generated Category")) end)

    # string_keys = Enum.map(company_categories, &List.to_string(&1))
    # first_category = List.first(response)
    # attributes = Enum.map(string_keys, fn key -> Map.get(first_category, key) end)
    # |> Enum.filter(fn entry -> case entry do
    #   nil -> false
    #   _ -> true
    #   end
    # end)
    # attribute_keys = Map.keys(List.first(attributes))

    # assert Enum.map(attribute_keys, &String.contains?(&1, "Generated Attribute"))
    # meta_map_of_first_attribute = Map.get(List.first(attributes), List.first(attribute_keys))
    # meta_map_keys = Map.keys(meta_map_of_first_attribute)
    # assert Enum.map(meta_map_keys, fn key ->
    #   case key do
    #    "type" -> true
    #    "value" -> true
    #    _ -> false
    #   end
    #  end)
    # assert Map.get(meta_map_of_first_attribute, "type") |> String.contains?("Generated type")
    # assert Map.get(meta_map_of_first_attribute, "value") |> String.contains?("Generated value")
  # end

  test "GET /categories returns empty list if there are no categories", %{conn: conn} do
    conn = conn |> get("/api/categories")
    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]
    assert length(response) == 0
  end

end
