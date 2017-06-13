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

end