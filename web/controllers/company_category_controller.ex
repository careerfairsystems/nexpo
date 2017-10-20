defmodule Nexpo.CompanyCategoryController do
  use Nexpo.Web, :controller

  alias Nexpo.CompanyCategory

  @apidoc """
  @apiDefine CategoryParams

  @apiParam {String} title    Title
  """

  @apidoc """
  @api {GET} /categories/ List categories
  @apiName List Categories
  @apiGroup Category

  @apiUse NotFoundError
  @apiUse InternalServerError
  """
  def index(conn, _params) do
    company_categories = Repo.all(CompanyCategory) |> Repo.preload(:attributes)
    render(conn, "index.json", company_categories: company_categories)
  end

  @apidoc """
  @api {POST} /categories/ Create category
  @apiName Create Category
  @apiGroup Category

  @apiUse CategoryParams

  @apiSuccess (Created 201) {Number} id       Internal ID
  @apiSuccess (Created 201) {String} title    Title

  @apiUse UnprocessableEntity
  @apiUse InternalServerError
  """
  def create(conn, company_category_params) do
    changeset = CompanyCategory.changeset(%CompanyCategory{}, company_category_params)
    case Repo.insert(changeset) do
      {:ok, company_category} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", company_category_path(conn, :show, company_category))
        |> render("show.json", company_category: company_category)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  @apidoc """
  @api {GET} /categories/:id Get category
  @apiName Get Category
  @apiGroup Category

  @apiSuccess (OK 200) {Number} id       Internal ID
  @apiSuccess (OK 200) {String} title    Title

  @apiUse NotFoundError
  @apiUse InternalServerError
  """
  def show(conn, %{"id" => id}) do
    company_category = Repo.get!(CompanyCategory, id) |> Repo.preload(:attributes)
    render(conn, "show.json", company_category: company_category)
  end
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
