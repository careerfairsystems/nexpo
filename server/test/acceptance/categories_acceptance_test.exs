defmodule Nexpo.CategoriesAcceptanceTest do
  use Nexpo.ConnCase

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "/categories returns all companies", %{conn: conn} do
    company_categories = Factory.insert_list(3, :company_category)
    conn = conn |> get("/api/categories")

    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]
    assert length(response) == length(company_categories)
    assert Enum.count(response) == 3
    assert Enum.map(response, fn entry -> Map.keys(entry) |> Enum.map(&String.contains?(&1, "Generated Category")) end)
  end

  test "/categories returns attributes correctly" do
    #Check the first attribute
    company_categories = Factory.insert_list(3, :company_category)
    Factory.insert_list(2, :company_attribute, %{category: Enum.at(company_categories, 0)})
    conn = conn |> get("/api/categories")
    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]

    company_categories = Enum.map(response, &Map.keys(&1))
    assert length(company_categories) == 3
    assert Enum.map(company_categories, fn category_list -> Enum.map(category_list, &String.contains?(&1, "Generated Category")) end)

    string_keys = Enum.map(company_categories, &List.to_string(&1))
    first_cat = List.first(response)
    attributes = Enum.map(string_keys, fn key -> Map.get(first_cat, key) end)
    |> Enum.filter(fn entry -> case entry do
      nil -> false
      _ -> true
      end
    end)
    attr_keys = Map.keys(List.first(attributes))
    assert Enum.map(attr_keys, &String.contains?(&1, "Generated Attribute"))
    #assert val == nil



  end

  test "/categories returns empty list if there are no categories", %{conn: conn} do
    conn = conn |> get("/api/categories")

    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]
    assert length(response) == 0
  end


end
