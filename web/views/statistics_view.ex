defmodule Nexpo.StatisticsView do
  use Nexpo.Web, :view

  def render("index.json", %{statistics: statistics}) do
    %{data: render_one(statistics, Nexpo.StatisticsView, "statistics.json")}
  end

  # def render("show.json", %{statistics: statistics}) do
  #   %{data: render_one(statistics, Nexpo.StatisticsView, "statistics.json")}
  # end

  def render("statistics.json", %{statistics: statistics}) do
    # Define own parameters to keep
    base = [:nbr_searching_students, :nbr_students, :company_stats]

    Nexpo.Support.View.render_object(statistics, base)
  end
end
