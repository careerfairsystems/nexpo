defmodule Nexpo.CategoriesAcceptanceTest do
  use Nexpo.ConnCase

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  @tag :logged_in
  test "GET /categories returns all categories that exist", %{conn: conn} do
    categories = Factory.insert_list(3, :category)
    conn = conn |> get("/api/categories")

    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]
    assert length(response) == length(categories)
  end

  @tag :logged_in
  test "GET /categories is empty if no categories exist", %{conn: conn} do
    conn = conn |> get("/api/categories")
    assert json_response(conn, 200)
    respose = Poison.decode!(conn.resp_body)["data"]
    assert length(respose) == 0
  end

  @tag :logged_in
  test "GET /categories/:id returns an empty attributes list if no exist", %{conn: conn} do
    category = Factory.insert(:category)

    conn = conn |> get("/api/categories/#{category.id}")
    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]

    schema =
      %{
        "type" => "object",
        "additionalProperties" => false,
        "properties" => %{
          "id" => %{"type" => "number"},
          "title" => %{"type" => "string"},
          "attributes" => %{
            "type" => "array",
            "maxItems" => 0
          }
        }
      }
      |> ExJsonSchema.Schema.resolve()

    assert ExJsonSchema.Validator.validate(schema, response) == :ok
  end

  @tag :logged_in
  test "GET /categories returns data on the right format", %{conn: conn} do
    Factory.insert(:category) |> Factory.with_attributes(3)
    Factory.insert(:category) |> Factory.with_attributes(3)
    conn = conn |> get("/api/categories")

    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]

    schema =
      %{
        "type" => "array",
        "minItems" => 2,
        "items" => %{
          "type" => "object",
          "additionalProperties" => false,
          "properties" => %{
            "id" => %{"type" => "number"},
            "title" => %{"type" => "string"},
            "attributes" => %{
              "type" => "array",
              "minItems" => 3
            }
          }
        }
      }
      |> ExJsonSchema.Schema.resolve()

    assert ExJsonSchema.Validator.validate(schema, response) == :ok
  end

  @tag :logged_in
  test "GET /categories/:id returns data on the right format", %{conn: conn} do
    category = Factory.insert(:category) |> Factory.with_attributes(3)
    conn = conn |> get("/api/categories/#{category.id}")

    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]

    schema =
      %{
        "type" => "object",
        "additionalProperties" => false,
        "properties" => %{
          "id" => %{"type" => "number"},
          "title" => %{"type" => "string"},
          "attributes" => %{
            "type" => "array",
            "minItems" => 3
          }
        }
      }
      |> ExJsonSchema.Schema.resolve()

    assert ExJsonSchema.Validator.validate(schema, response) == :ok
  end

  @tag :logged_in
  test "POST /categories/ creates a category given correct parameters", %{conn: conn} do
    params = Factory.params_for(:category)
    conn = post(conn, "/api/categories", category: params)

    assert json_response(conn, 201)

    new_company = Nexpo.Repo.get_by(Nexpo.Category, params)
    assert new_company != nil
  end

  @tag :logged_in
  test "POST /categories fails given insufficient data", %{conn: conn} do
    params = %{}
    conn = post(conn, "/api/categories", category: params)

    assert json_response(conn, 422)
  end

  @tag :logged_in
  test "POST /categories/ returns the category on success", %{conn: conn} do
    params = Factory.params_for(:category)
    conn = post(conn, "/api/categories", category: params)

    assert json_response(conn, 201)
    response = Poison.decode!(conn.resp_body)["data"]

    schema =
      %{
        "type" => "object",
        "additionalProperties" => false,
        "properties" => %{
          "id" => %{"type" => "number"},
          "title" => %{"type" => "string"}
        }
      }
      |> ExJsonSchema.Schema.resolve()

    assert ExJsonSchema.Validator.validate(schema, response) == :ok
  end
end
