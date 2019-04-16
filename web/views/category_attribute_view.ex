defmodule Nexpo.CategoryAttributeView do
  use Nexpo.Web, :view

  def render("index.json", %{category_attributes: category_attributes}) do
    %{
      data:
        render_many(category_attributes, Nexpo.CategoryAttributeView, "category_attribute.json")
    }
  end

  def render("show.json", %{category_attribute: category_attribute}) do
    %{
      data:
        render_one(category_attribute, Nexpo.CategoryAttributesView, "category_attribute.json")
    }
  end

  def render("category_attribute.json", %{category_attribute: category_attribute}) do
    # Define own parameters to keep
    base = [:id, :title, :type, :value]

    Nexpo.Support.View.render_object(category_attribute, base)
  end
end
