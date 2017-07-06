defmodule Nexpo.CompanyCategoryView do
  use Nexpo.Web, :view

  def render("index.json", %{company_categories: company_categories}) do
    %{data: render_many(company_categories, Nexpo.CompanyCategoryView, "company_category.json")}
  end

  def render("show.json", %{company_category: company_category}) do
    %{data: render_one(company_category, Nexpo.CompanyCategoryView, "company_category.json")}
  end

  def render("company_category.json", %{company_category: company_category}) do
    # Define own parameters to keep
    base = [:title, :id]

    # Define all relations to render
    relations = [:attributes]

    Nexpo.Support.View.render_object(company_category, base, relations)
  end

end
