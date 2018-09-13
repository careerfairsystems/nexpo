defmodule Nexpo.CategoryAttributeController do
  use Nexpo.Web, :controller

  # alias Nexpo.CategoryAttribute

#  def index(conn, _params) do
#    categories = Repo.all(Category)
#    render(conn, "index.json", categories: categories)
#  end

  # def create(conn, company_attribute_params) do
  #   changeset = CategoryAttribute.changeset(%CategoryAttribute{}, company_attribute_params)
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
#    category = Repo.get!(Category, id)
#    render(conn, "show.json", category: category)
#  end
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
end
