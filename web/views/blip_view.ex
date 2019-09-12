defmodule Nexpo.BlipView do
  use Nexpo.Web, :view

  def render("index.json", %{blips: blips}) do
    %{data: render_many(blips, Nexpo.BlipView, "blip.json")}
  end

  def render("show.json", %{blip: blip}) do
    %{data: render_one(blip, Nexpo.BlipView, "blip.json")}
  end

  def render("blip.json", %{blip: blip}) do
    %{id: blip.id,
      user_id: blip.user_id,
      company_id: blip.company_id,
      rating: blip.rating,
      comment: blip.comment}
  end
end
