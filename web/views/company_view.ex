defmodule Nexpo.CompanyView do
  use Nexpo.Web, :view

  def render("index.json", %{companies: companies}) do
    %{data: render_many(companies, Nexpo.CompanyView, "company.json")}
  end

  def render("show.json", %{company: company}) do
    %{data: render_one(company, Nexpo.CompanyView, "company.json")}
  end

  def render("company.json", %{company: company}) do
    # Define own parameters to keep
    base = [:id, :name, :logoUrl, :description, :website, :student_session_days]

    Nexpo.Support.View.render_object(company, base)
  end
end
