defmodule Nexpo.RepresentativeView do
  use Nexpo.Web, :view

  def render("index.json", %{representatives: representatives}) do
    %{data: render_many(representatives, Nexpo.RepresentativeView, "representative.json")}
  end

  def render("show.json", %{representative: representative}) do
    %{data: render_one(representative, Nexpo.RepresentativeView, "representative.json")}
  end

  def render("representative.json", %{representative: representative}) do
    # Define own parameters to keep
    base = [:id]

    Nexpo.Support.View.render_object(representative, base)
  end
end
