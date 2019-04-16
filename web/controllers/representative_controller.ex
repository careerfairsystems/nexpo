defmodule Nexpo.RepresentativeController do
  use Nexpo.Web, :controller

  alias Nexpo.Representative
  alias Guardian.Plug.{EnsurePermissions}

  plug(
    EnsurePermissions,
    [
      handler: Nexpo.SessionController,
      one_of: [%{default: ["read_all"]}, %{default: ["read_users"]}]
    ]
    when action in [:index, :show]
  )

  plug(
    EnsurePermissions,
    [
      handler: Nexpo.SessionController,
      one_of: [%{default: ["write_all"]}, %{default: ["write_users"]}]
    ]
    when action in [:create, :update, :delete]
  )

  def index(conn, _params) do
    representatives = Repo.all(Representative)
    render(conn, "index.json", representatives: representatives)
  end

  def create(conn, %{"representative" => representative_params}) do
    changeset = Representative.changeset(%Representative{}, representative_params)

    case Repo.insert(changeset) do
      {:ok, representative} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", representative_path(conn, :show, representative))
        |> render("show.json", representative: representative)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    representative = Repo.get!(Representative, id)
    render(conn, "show.json", representative: representative)
  end

  def update(conn, %{"id" => id, "representative" => representative_params}) do
    representative = Repo.get!(Representative, id)
    changeset = Representative.changeset(representative, representative_params)

    case Repo.update(changeset) do
      {:ok, representative} ->
        render(conn, "show.json", representative: representative)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    representative = Repo.get!(Representative, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(representative)

    send_resp(conn, :no_content, "")
  end
end
