defmodule Nexpo.InterestController do
  use Nexpo.Web, :controller

  alias Nexpo.Interest
  alias Guardian.Plug.{EnsurePermissions}

  plug(
    EnsurePermissions,
    [
      handler: Nexpo.SessionController,
      one_of: [%{default: ["read_all"]}]
    ]
    when action in [:show]
  )

  plug(
    EnsurePermissions,
    [
      handler: Nexpo.SessionController,
      one_of: [%{default: ["write_all"]}]
    ]
    when action in [:create, :update, :delete]
  )

  def index(conn, _params) do
    interests = Repo.all(Interest)
    render(conn, "index.json", interests: interests)
  end

  def create(conn, %{"interest" => interest_params}) do
    changeset = Interest.changeset(%Interest{}, interest_params)

    case Repo.insert(changeset) do
      {:ok, interest} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", interest_path(conn, :show, interest))
        |> render("show.json", interest: interest)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    interest = Repo.get!(Interest, id)
    render(conn, "show.json", interest: interest)
  end

  def update(conn, %{"id" => id, "interest" => interest_params}) do
    interest = Repo.get!(Interest, id)
    changeset = Interest.changeset(interest, interest_params)

    case Repo.update(changeset) do
      {:ok, interest} ->
        render(conn, "show.json", interest: interest)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    interest = Repo.get!(Interest, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(interest)

    send_resp(conn, :no_content, "")
  end
end
