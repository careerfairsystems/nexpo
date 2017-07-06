defmodule Nexpo.AttributesAcceptanceTest do
  use Nexpo.ConnCase

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "POST /attributes is possible with valid attributes", %{conn: conn} do
    conn = conn |> post("/api/categories", %{title: "Logistik"})
    assert json_response(conn, 201)
    conn = conn |> get("/api/categories")
    assert json_response(conn, 200)
    response = Poison.decode!(conn.resp_body)["data"]
    #assert response == nil

    conn = conn |> post("/api/attributes", %{title: "El kablar", type: "Antal", value: "ange antal kablar du önskar",
                                              company_category_id: List.first(response)["id"]})
    assert json_response(conn, 201)
    conn = conn |> post("/api/attributes", %{title: "Stå bord", type: "Storlek", value: "ange storlek på era ståbord",
                                              company_category_id: List.first(response)["id"]})
    assert json_response(conn, 201)

    conn = conn |> get("/api/categories")
    assert json_response(conn, 200)
    # response = Poison.decode!(conn.resp_body)["data"]

    assert Enum.map(Map.keys(List.first(response)), fn key -> String.contains?(key, "Logistik") end)

    #assert response.title == "Logistik"
    #assert Enum.map(Map.keys(List.first(response)), fn key ->  end)

  end


end
