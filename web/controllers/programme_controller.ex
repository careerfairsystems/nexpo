defmodule Nexpo.ProgrammeController do
  use Nexpo.Web, :controller

  alias Nexpo.Programme

  alias Guardian.Plug.{EnsurePermissions}

  plug EnsurePermissions, [handler: Nexpo.SessionController,
                           one_of: [%{default: ["write_all"]},
                                    %{default: ["write_users"]}]
                          ] when action in [:create, :update, :delete]

  def index(conn, _params) do
    programmes = Repo.all(Programme)
    render(conn, "index.json", programmes: programmes)
  end

  def create(conn, %{"programme" => programme_params}) do
    changeset = Programme.changeset(%Programme{}, programme_params)

    case Repo.insert(changeset) do
      {:ok, programme} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", programme_path(conn, :show, programme))
        |> render("show.json", programme: programme)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    programme = Programme
        |> Repo.get!(id)
        |> Repo.preload(:desired_programmes)
    render(conn, "show.json", programme: programme)
  end

  def update(conn, %{"id" => id, "programme" => programme_params}) do
    programme = Repo.get!(Programme, id)
    changeset = Programme.changeset(programme, programme_params)

    case Repo.update(changeset) do
      {:ok, programme} ->
        render(conn, "show.json", programme: programme)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    programme = Repo.get!(Programme, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(programme)

    send_resp(conn, :no_content, "")
  end
end
