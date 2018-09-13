defmodule Nexpo.CategoryView do
  use Nexpo.Web, :view

  def render("index.json", %{categories: categories}) do
    %{data: render_many(categories, Nexpo.CategoryView, "category.json")}
  end

  def render("show.json", %{category: category}) do
    %{data: render_one(category, Nexpo.CategoryView, "category.json")}
  end

  def render("category.json", %{category: category}) do
    # Define own parameters to keep
    base = [:id, :title]

    Nexpo.Support.View.render_object(category, base)
  end

end
