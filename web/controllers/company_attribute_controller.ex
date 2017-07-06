defmodule Nexpo.CompanyAttributeController do
  use Nexpo.Web, :controller

  alias Nexpo.CompanyAttribute

#  def index(conn, _params) do
#    company_categories = Repo.all(CompanyCategory)
#    render(conn, "index.json", company_categories: company_categories)
#  end

  # def create(conn, company_attribute_params) do
  #   changeset = CompanyAttribute.changeset(%CompanyAttribute{}, company_attribute_params)
  #   case Repo.insert(changeset) do
  #     {:ok, _company_attribute} ->
  #       conn
  #       |> put_status(:created)
  #       |> json(company_attribute_params)
  #     {:error, changeset} ->
  #       conn
  #       |> put_status(:unprocessable_entity)
  #       |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
  #   end
  # end
#
#  def show(conn, %{"id" => id}) do
#    company_category = Repo.get!(CompanyCategory, id)
#    render(conn, "show.json", company_category: company_category)
#  end
#
#  def update(conn, %{"id" => id, "company_category" => company_category_params}) do
#    company_category = Repo.get!(CompanyCategory, id)
#    changeset = CompanyCategory.changeset(company_category, company_category_params)
#
#    case Repo.update(changeset) do
#      {:ok, company_category} ->
#        render(conn, "show.json", company_category: company_category)
#      {:error, changeset} ->
#        conn
#        |> put_status(:unprocessable_entity)
#        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
#    end
#  end
#
#  def delete(conn, %{"id" => id}) do
#    company_category = Repo.get!(CompanyCategory, id)
#
#    # Here we use delete! (with a bang) because we expect
#    # it to always work (and if it does not, it will raise).
#    Repo.delete!(company_category)
#
#    send_resp(conn, :no_content, "")
#  end
end
