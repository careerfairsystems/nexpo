defmodule Nexpo.JobOfferView do
  use Nexpo.Web, :view

  def render("index.json", %{job_offers: job_offers}) do
    %{data: render_many(job_offers, Nexpo.JobOfferView, "job_offer.json")}
  end

  def render("show.json", %{job_offer: job_offer}) do
    %{data: render_one(job_offer, Nexpo.JobOfferView, "job_offer.json")}
  end

  def render("job_offer.json", %{job_offer: job_offer}) do
    %{id: job_offer.id, type: job_offer.type}
  end
end
