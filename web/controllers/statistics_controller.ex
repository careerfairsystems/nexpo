defmodule Nexpo.StatisticsController do
  use Nexpo.Web, :controller

  alias Nexpo.Statistics

  def index(conn, _params) do
    statistics = Statistics.get_all()
    render(conn, "index.json", statistics: statistics)
  end
end
