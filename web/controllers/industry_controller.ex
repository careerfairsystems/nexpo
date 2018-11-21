defmodule Nexpo.IndustryController do
  use Nexpo.Web, :controller

  alias Nexpo.{Industry, Company}
  alias Guardian.Plug.{EnsurePermissions}

  plug EnsurePermissions, [handler: Nexpo.SessionController,
                           one_of: [%{default: ["read_all"]},
                                    %{default: ["read_companies"]}]
                          ] when action in [:index, :show]
  plug EnsurePermissions, [handler: Nexpo.SessionController,
                           one_of: [%{default: ["write_all"]},
                                    %{default: ["write_companies"]}]
                          ] when action in [:create, :update, :delete]

  def index(conn, _params) do
    industries = Repo.all(Industry)
    render(conn, "index.json", industries: industries)
  end

  def create(conn, %{"industry" => industry_params}) do
    changeset = Industry.changeset(%Industry{}, industry_params)

    case Repo.insert(changeset) do
      {:ok, industry} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", industry_path(conn, :show, industry))
        |> render("show.json", industry: industry)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    industry = Repo.get!(Industry, id)
                |> Repo.preload([:companies])
    render(conn, "show.json", industry: industry)
  end

  def update(conn, %{"id" => id, "industry" => industry_params}) do
    industry = Repo.get!(Industry, id)
                |> Repo.preload(:companies)
    changeset = Industry.changeset(industry, industry_params)
                  |> Company.put_assoc(industry_params)

    case Repo.update(changeset) do
      {:ok, industry} ->
        render(conn, "show.json", industry: industry)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    industry = Repo.get!(Industry, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(industry)

    send_resp(conn, :no_content, "")
  end
end
