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

    # Construct an array with all the rendered relations
    relations = Map.keys(object)
      |> Enum.filter(fn r -> Ecto.assoc_loaded?(Map.get(object, r)) end)
      |> Enum.map(fn r -> render_relation(object, r) end)

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

  # Defines how to render all possible relations in database
  # Both in plural and singular
  defp render_relation(object, relation) do
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
      :logo_url ->
        %{:logo_url => Nexpo.ProfileImage.url(get_url(object, relation), :original)}
      :resume_en_url ->
        %{:resume_en_url => Nexpo.CvEn.url(get_url(object, relation), :original)}
      :resume_sv_url ->
        %{:resume_sv_url => Nexpo.CvSv.url(get_url(object, relation), :original)}
      _ ->
        %{}
    end
  end

  defp get_url(object, attribute) do
    file_name = Map.from_struct(object) |> get_in([attribute, :file_name])
    {file_name, object}
  end

end
