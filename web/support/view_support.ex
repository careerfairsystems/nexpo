defmodule Nexpo.Support.View do
  use Nexpo.Web, :view

  @doc """
  Creates a Map that can be converted to JSON
  """
  def render_object(object, base_params, relations_params) do
    # Build base object
    base = Map.take(object, base_params)

    # Populate relations
    relations = relations_params
    |> Enum.filter(fn r -> Map.has_key?(object, r) && is_loaded(Map.get(object, r)) end)
    |> Enum.map(fn r -> render_relation(r, object) end)

    # Return base if there are no relations
    if(Enum.empty?(relations)) do
      base
    # Return base with relations if there are relations
    else
      relations
      |> Enum.reduce(fn (x, acc) -> Map.merge(acc, x) end)
      |> Map.merge(base)
    end
  end

  # Defines how to render all entities in database
  # Both in plural and singular
  defp render_relation(relation, object) do
    case relation do
      :categories ->
        %{:categories => render_many(object.categories, Nexpo.CompanyCategoryView, "company_category.json")}
      :attributes ->
        %{:attributes => render_many(object.attributes, Nexpo.CompanyAttributeView, "company_attribute.json")}
      :entry ->
        %{:entry => render_one(object.entry, Nexpo.CompanyEntryView, "company_entry.json")}
      _ ->
        %{}
    end
  end

  # Checks wheter association has been loaded
  defp is_loaded(object) do
    case object do
      %Ecto.Association.NotLoaded{} -> false
      _ -> true
    end
  end

end
