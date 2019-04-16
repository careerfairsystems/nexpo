defmodule Nexpo.DeadlineController do
  use Nexpo.Web, :controller

  alias Nexpo.Deadline
  alias Guardian.Plug.{EnsurePermissions}

  plug(
    EnsurePermissions,
    [handler: Nexpo.SessionController, default: ["read_all"]] when action in [:index, :show]
  )

  plug(
    EnsurePermissions,
    [handler: Nexpo.SessionController, default: ["write_all"]]
    when action in [:create, :update, :delete]
  )

  def index(conn, _params) do
    deadlines = Repo.all(Deadline)
    render(conn, "index.json", deadlines: deadlines)
  end

  def create(conn, %{"deadline" => deadline_params}) do
    changeset = Deadline.changeset(%Deadline{}, deadline_params)

    case Repo.insert(changeset) do
      {:ok, deadline} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", deadline_path(conn, :show, deadline))
        |> render("show.json", deadline: deadline)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    deadline = Repo.get!(Deadline, id)
    render(conn, "show.json", deadline: deadline)
  end

  def update(conn, %{"id" => id, "deadline" => deadline_params}) do
    deadline = Repo.get!(Deadline, id)
    changeset = Deadline.changeset(deadline, deadline_params)

    case Repo.update(changeset) do
      {:ok, deadline} ->
        render(conn, "show.json", deadline: deadline)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    deadline = Repo.get!(Deadline, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(deadline)

    send_resp(conn, :no_content, "")
  end
end
