defmodule Nexpo.CompanyEntryView do
  use Nexpo.Web, :view

  def render("index.json", %{company_entries: company_entries}) do
    %{data: render_many(company_entries, Nexpo.CompanyEntryView, "company_entry.json")}
  end

  def render("show.json", %{company_entry: company_entry}) do
    %{data: render_one(company_entry, Nexpo.CompanyEntryView, "company_entry.json")}
  end

  def render("company_entry.json", %{company_entry: company_entry}) do
    # Define own parameters to keep
    base = [:id, :value]

    Nexpo.Support.View.render_object(company_entry, base)
  end

end
