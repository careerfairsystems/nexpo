defmodule Nexpo.CompanyView do
  use Nexpo.Web, :view

  def render("index.json", %{companies: companies}) do
      %{data: render_many(companies, Nexpo.CompanyView, "company.json")}
    end

    def render("show.json", %{company: company}) do
      %{data: render_one(company, Nexpo.CompanyView, "company.json")}
    end

    def render("company.json", %{company: company}) do

      # Define parameters from company table to be included
      base = %{
        id: company.id,
        name: company.name,
        email: company.email,
      }

      # Define all relations that can be rendered
      relations = [:categories]

      # Populate all relations
      relations
      |> Enum.filter(fn r -> Map.has_key?(company, r) end)
      |> Enum.map(fn r -> render_relation(r, company) end)
      |> Enum.reduce(fn (x, acc) -> Map.merge(acc, x) end)
      |> Map.merge(base)

    end

    defp render_relation(relation, company) do
      case relation do
        :categories ->
          %{:categories => render_many(company.categories, Nexpo.CompanyCategoryView, "company_category.json")}
      end
    end

end
