defmodule Nexpo.StatisticsControllerTest do
  use Nexpo.ConnCase

  alias Nexpo.Statistics

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end





  @tag :logged_in
  test "deletes chosen resource", %{conn: conn} do
    statistics = Repo.insert! %Statistics{}
    conn = delete conn, statistics_path(conn, :delete, statistics)
    assert response(conn, 204)
    refute Repo.get(Statistics, statistics.id)
  end
end
