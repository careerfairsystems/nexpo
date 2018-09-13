defmodule Nexpo.CategoryView do
  use Nexpo.Web, :view

  def render("index.json", %{company_categories: company_categories}) do
    %{data: render_many(company_categories, Nexpo.CategoryView, "category.json")}
  end

  def render("show.json", %{company_category: company_category}) do
    %{data: render_one(company_category, Nexpo.CategoryView, "category.json")}
  end

  def render("category.json", %{category: category}) do
    # Define own parameters to keep
    base = [:id, :title]

    Nexpo.Support.View.render_object(category, base)
  end

end
