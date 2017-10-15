defmodule Nexpo.CompanyAttributeView do
  use Nexpo.Web, :view

  def render("index.json", %{company_attributes: company_attributes}) do
    %{data: render_many(company_attributes, Nexpo.CompanyAttributeView, "company_attribute.json")}
  end

  def render("show.json", %{company_attribute: company_attribute}) do
    %{data: render_one(company_attribute, Nexpo.CompanyAttributesView, "company_attribute.json")}
  end

  def render("company_attribute.json", %{company_attribute: company_attribute}) do
    # Define own parameters to keep
    base = [:id, :title, :type, :value]

    Nexpo.Support.View.render_object(company_attribute, base)

  end

end
