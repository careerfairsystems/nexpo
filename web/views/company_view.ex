defmodule Nexpo.CompanyView do
  use Nexpo.Web, :view

  def render("index.json", %{companies: companies}) do
      %{data: render_many(companies, Nexpo.CompanyView, "company.json")}
    end

    def render("show.json", %{company: company}) do
      %{data: render_one(company, Nexpo.CompanyView, "company.json")}
    end

    def render("company.json", %{company: company}) do
      base = %{
        id: company.id,
        name: company.name
      }

      result = company.entries
      |> Enum.map(fn e ->
        Map.put(%{}, e.attribute.title, e.value)
      end)
      |> IO.inspect()
      |> Enum.reduce(fn o, acc -> Map.merge(acc, o) end)

      Map.merge(result, base)



    end

end
