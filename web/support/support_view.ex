defmodule Nexpo.Support.View do
  @moduledoc """
  A module that can render all models

  The helper makes sure to render all preloaded associations and ignores
  all relations which are not preloaded
  """
  use Nexpo.Web, :view

  @doc """
  Creates a Map that can be converted to JSON
  """
  def render_object(object, base_params) do
    # Build base object
    base = Map.take(object, base_params)
          |> append_url(object, :logo_url)
          |> append_url(object, :resume_sv_url)
          |> append_url(object, :resume_en_url)

    # Construct an array with all the rendered relations
    relations = Map.keys(object)
      |> List.delete(:__meta__)
      |> List.delete(:inserted_at)
      |> List.delete(:updated_at)
      |> Enum.filter(fn r -> is_struct?(Map.get(object, r)) end)
      |> Enum.filter(fn r -> Ecto.assoc_loaded?(Map.get(object, r)) end)
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
  
  defp is_struct?(%_{}) do true end

  defp is_struct?(list) when is_list(list) do
    is_struct?(List.first(list))
  end
  
  defp is_struct?(_not_struct) do false end

  # Defines how to render all possible relations in database
  # Both in plural and singular
  defp render_relation(relation, object) do
    case relation do
      :entries ->
        %{:entries => render_many(object.entries, Nexpo.CompanyEntryView, "company_entry.json")}
      :company ->
        %{:company => render_one(object.company, Nexpo.CompanyView, "company.json")}
      :attribute ->
        %{:attribute => render_one(object.attribute, Nexpo.CategoryAttributeView, "category_attribute.json")}
      :attributes ->
        %{:attributes => render_many(object.attributes, Nexpo.CategoryAttributeView, "category_attribute.json")}
      :category ->
        %{:category => render_one(object.category, Nexpo.CategoryView, "category.json")}
      :roles ->
        %{:roles => render_many(object.roles, Nexpo.RoleView, "role.json")}
      :users ->
        %{:users => render_many(object.users, Nexpo.UserView, "user.json")}
      :student ->
        %{:student => render_one(object.student, Nexpo.StudentView, "student.json")}
      _ ->
        %{}
    end
  end

  defp append_url(base, object, url) do
    case Map.get(object, url) do
      nil -> base
      _ -> Map.put(base, url, render_url(base, url))
    end
  end

  defp render_url(entry, attribute) do
    file_name = entry[attribute].file_name
    case attribute do
      :logo_url ->  Nexpo.ProfileImage.url({file_name, entry}, :original)
      :resume_en_url ->  Nexpo.CvEn.url({file_name, entry}, :original)
      :resume_sv_url ->  Nexpo.CvSv.url({file_name, entry}, :original)
      _ -> nil
    end
  end

end
