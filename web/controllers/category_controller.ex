defmodule Nexpo.CategoryController do
  use Nexpo.Web, :controller

  alias Nexpo.Category
  alias Guardian.Plug.{EnsurePermissions}

  plug(
    EnsurePermissions,
    [
      handler: Nexpo.SessionController,
      one_of: [%{default: ["read_all"]}, %{default: ["read_categories"]}]
    ]
    when action in [:index, :show]
  )

  plug(
    EnsurePermissions,
    [
      handler: Nexpo.SessionController,
      one_of: [%{default: ["write_all"]}, %{default: ["write_categories"]}]
    ]
    when action in [:create, :update, :delete]
  )

  @apidoc """
  @api {GET} /categories List categories
  @apiGroup Category

  @apiSuccessExample {json} Success
  HTTP 200 Ok
  {
    "data": [
      {
        "id": 1,
        "title": "Example category",
        "attributes": []
        },
        {
          "id": 2,
          "title": "Other category",
          "attributes": []
        }
      ]
    }

  @apiUse NotFoundError
  @apiUse InternalServerError
  """
  def index(conn, _params) do
    categories = Repo.all(Category) |> Repo.preload(:attributes)
    render(conn, "index.json", categories: categories)
  end

  @apidoc """
  @api {POST} /categories/ Create category
  @apiName Create Category
  @apiGroup Category

  @apiParam {String} title    Title

  @apiSuccess (Created 201) {Number} id       Internal ID
  @apiSuccess (Created 201) {String} title    Title

  @apiUse UnprocessableEntity
  @apiUse InternalServerError
  """
  def create(conn, %{"category" => category_params}) do
    changeset = Category.changeset(%Category{}, category_params)

    case Repo.insert(changeset) do
      {:ok, category} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", category_path(conn, :show, category))
        |> render("show.json", category: category)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  @apidoc """
  @api {GET} /categories/:id Get category
  @apiGroup Category

  @apiParam {Number} id ID of the category

  @apiSuccess (OK 200) {Number} id       Internal ID
  @apiSuccess (OK 200) {String} title    Title

  @apiSuccessExample {json} Success
    HTTP 200 Ok
    {
      "data": {
        "id": 1,
        "title": "Example category",
        "attributes": []
      }
    }

  @apiUse NotFoundError
  @apiUse InternalServerError
  """
  def show(conn, %{"id" => id}) do
    category =
      Repo.get!(Category, id)
      |> Repo.preload(attributes: [entries: :company])

    render(conn, "show.json", category: category)
  end

  #
  #  def update(conn, %{"id" => id, "category" => category_params}) do
  #    category = Repo.get!(Category, id)
  #    changeset = Category.changeset(category, category_params)
  #
  #    case Repo.update(changeset) do
  #      {:ok, category} ->
  #        render(conn, "show.json", category: category)
  #      {:error, changeset} ->
  #        conn
  #        |> put_status(:unprocessable_entity)
  #        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
  #    end
  #  end
  #
  #  def delete(conn, %{"id" => id}) do
  #    category = Repo.get!(Category, id)
  #
  #    # Here we use delete! (with a bang) because we expect
  #    # it to always work (and if it does not, it will raise).
  #    Repo.delete!(category)
  #
  #    send_resp(conn, :no_content, "")
  #  end

  @apidoc
end
