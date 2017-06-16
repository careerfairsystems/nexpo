defmodule Nexpo.CompanyView do
  use Nexpo.Web, :view

  import Ecto.Query

  def render("index.json", %{companies: companies}) do
      %{data: render_many(companies, Nexpo.CompanyView, "company.json")}
    end

    def render("show.json", %{company: company}) do
      %{data: render_one(company, Nexpo.CompanyView, "company.json")}
    end

    def render("company.json", %{company: company}) do

      # Fetch company structure from db
      # TODO: Cache the result from this query this to improve performance
      categories =
      Nexpo.Repo.all from(
        category in Nexpo.CompanyCategory,
        join: attribute in assoc(category, :attributes),
        left_join: entry in Nexpo.CompanyEntry, on: entry.company_attribute_id == attribute.id and entry.company_id == ^company.id,
        preload: [attributes: {attribute, entries: entry}]
      )

      # Format structure into regular maps
      formatted =
      # Create a list of maps for all categories
      categories |> Enum.map( fn category ->
          # Create key:value of category:attributes
          %{} |> Map.put(category.title,
            # Create a list of maps for all attributes and entries
            Enum.map(category.attributes, fn attribute ->
              entry_value = attribute.entries |> Support.List.first_or(%{}) |> Map.get(:value)
              attribute_title = attribute.title
              %{} |> Map.put(attribute_title, entry_value)
            end)
            # Reduce the attributes/entry list to one object
            |> Enum.reduce(fn x, acc -> Map.merge(acc, x) end)
          )
        end
      )

      # Convert list of categories to a map
      formatted =
      case formatted do
        [] -> %{}
        other -> Enum.reduce(other, fn x, acc -> Map.merge(acc, x) end)
      end

      # Define parameters from company table to be included
      base = %{
        id: company.id,
        name: company.name
      }

      # Merge the company parameters with formatted categories/attributes/entries
      Map.merge(base, formatted)
    end

end
