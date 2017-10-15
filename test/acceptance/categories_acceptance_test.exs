defmodule Nexpo.CategoriesAcceptanceTest do
  use Nexpo.ConnCase

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "GET /categories returns all categories that exist", %{conn: conn} do
    company_categories = Factory.insert_list(3, :company_category)
    conn = conn |> get("/api/categories")

    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]
    assert length(response) == length(company_categories)
  end

  test "GET /categories is empty if no categories exist", %{conn: conn} do
    conn = conn |> get("/api/categories")
    assert json_response(conn, 200)
    respose = Poison.decode!(conn.resp_body)["data"]
    assert length(respose) == 0
  end

  test "GET /categories returns an empty attributes list if no exist", %{conn: conn} do
    Factory.insert_list(3, :company_category)
    #Factory.insert_list(2, :company_attribute, %{category: Enum.at(init_cats, 0)})

    conn = conn |> get("/api/categories")
    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]
    Enum.each(response, fn category ->
      assert Map.has_key?(category, "attributes")
      assert is_list(Map.get(category, "attributes"))
      assert length(Map.get(category, "attributes")) == 0
    end)
  end

  test "GET /categories returns all attributes assigned to a category", %{conn: conn} do
    # Create 4 categories some attributes some without
    categories = Factory.insert_list(4, :company_category)
    Factory.insert_list(2, :company_attribute, %{category: Enum.at(categories, 0)})
    Factory.insert_list(5, :company_attribute, %{category: Enum.at(categories, 1)})

    conn = conn |> get("/api/categories")
    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]

    empty_categories = Enum.filter(response, fn category -> 
      att = Map.get(category, "attributes")
      length(att) == 0
    end)

    categories_with_attributes = Enum.filter(response, fn category -> 
      att = Map.get(category, "attributes")
      length(att) != 0    
    end)
    
    # Check that all values exist in categories without attributes
      Enum.each(empty_categories, fn category ->
        assert Map.has_key?(category, "title")
        assert Map.get(category, "title") != ""
        assert Map.has_key?(category, "id")
        assert Map.get(category, "id") != ""
        assert Map.has_key?(category, "attributes")
        assert length(Map.get(category, "attributes")) == 0
      end)

    # Check that all values exist in categories with attributes 
    Enum.each(categories_with_attributes, fn category ->
      assert Map.has_key?(category, "title")
      assert Map.get(category, "title") != ""
      assert Map.has_key?(category, "id")
      assert Map.get(category, "id") != ""
      assert Map.has_key?(category, "attributes")
      assert length(Map.get(category, "attributes")) != 0
      Enum.each(Map.get(category, "attributes"), fn attribute -> 
          assert Map.has_key?(attribute, "title")
          assert Map.get(attribute, "title") != ""
          assert Map.has_key?(attribute, "type")
          assert Map.get(attribute, "type") != ""
          assert Map.has_key?(attribute, "value")
          assert Map.get(attribute, "value") != ""
        end)
    end)

  end

end
