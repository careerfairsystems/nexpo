defmodule Nexpo.InterestView do
  use Nexpo.Web, :view

  def render("index.json", %{interests: interests}) do
    %{data: render_many(interests, Nexpo.InterestView, "interest.json")}
  end

  def render("show.json", %{interest: interest}) do
    %{data: render_one(interest, Nexpo.InterestView, "interest.json")}
  end

  def render("interest.json", %{interest: interest}) do
    %{id: interest.id, name: interest.name}
  end
end
