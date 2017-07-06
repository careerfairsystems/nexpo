defmodule Nexpo.CompanyController do
  use Nexpo.Web, :controller

  alias Nexpo.Company

  def index(conn, _params) do
    companies = Repo.all(Company)
    render(conn, "index.json", companies: companies)
  end

  # def new(conn, _params) do
  #   changeset = Company.changeset(%Company{})
  #   render(conn, "new.html", changeset: changeset)
  # end

   def create(conn, company_params) do
     changeset = Company.changeset(%Company{}, company_params)

     case Repo.insert(changeset) do
       {:ok, company} ->
         conn
         |> put_status(:created)
         |> put_resp_header("location", company_category_path(conn, :show, company))
         |> render("show.json", company: company)
       {:error, changeset} ->
         conn
         |> put_status(:unprocessable_entity)
         |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)     end
   end

  def show(conn, %{"id" => id}) do
    categories = Repo.all from(
      category in Nexpo.CompanyCategory,
      join: attribute in assoc(category, :attributes),
      left_join: entry in Nexpo.CompanyEntry, on: entry.company_attribute_id == attribute.id and entry.company_id == ^id,
      preload: [attributes: {attribute, entries: entry}]
    )
    company = Repo.get!(Company, id) |> Map.put(:categories, categories)
    # company = Repo.get!(Company, id)
    render(conn, "show.json", company: company)
  end

  # def edit(conn, %{"id" => id}) do
  #   company = Repo.get!(Company, id)
  #   changeset = Company.changeset(company)
  #   render(conn, "edit.html", company: company, changeset: changeset)
  # end

  # def update(conn, %{"id" => id, "company" => company_params}) do
  #   company = Repo.get!(Company, id)
  #   changeset = Company.changeset(company, company_params)

  #   case Repo.update(changeset) do
  #     {:ok, company} ->
  #       conn
  #       |> put_flash(:info, "Company updated successfully.")
  #       |> redirect(to: company_path(conn, :show, company))
  #     {:error, changeset} ->
  #       render(conn, "edit.html", company: company, changeset: changeset)
  #   end
  # end

  # def delete(conn, %{"id" => id}) do
  #   company = Repo.get!(Company, id)

  #   # Here we use delete! (with a bang) because we expect
  #   # it to always work (and if it does not, it will raise).
  #   Repo.delete!(company)

  #   conn
  #   |> put_flash(:info, "Company deleted successfully.")
  #   |> redirect(to: company_path(conn, :index))
  # end
end
