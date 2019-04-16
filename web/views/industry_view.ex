defmodule Nexpo.IndustryView do
  use Nexpo.Web, :view

  def render("index.json", %{industries: industries}) do
    %{data: render_many(industries, Nexpo.IndustryView, "industry.json")}
  end

  def render("show.json", %{industry: industry}) do
    %{data: render_one(industry, Nexpo.IndustryView, "industry.json")}
  end

  def render("industry.json", %{industry: industry}) do
    %{id: industry.id, name: industry.name}
  end
end
