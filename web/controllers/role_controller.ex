defmodule Nexpo.RoleController do
  use Nexpo.Web, :controller

  alias Nexpo.{Role, User}
  alias Guardian.Plug.{EnsurePermissions}

  plug(
    EnsurePermissions,
    [
      handler: Nexpo.SessionController,
      one_of: [%{default: ["read_all"]}, %{default: ["read_roles"]}]
    ]
    when action in [:index, :show]
  )

  plug(
    EnsurePermissions,
    [
      handler: Nexpo.SessionController,
      one_of: [%{default: ["write_all"]}, %{default: ["write_roles"]}]
    ]
    when action in [:create, :update, :delete]
  )

  def index(conn, _params) do
    roles = Repo.all(Role)
    render(conn, "index.json", roles: roles)
  end

  def create(conn, %{"role" => role_params}) do
    changeset =
      Role.changeset(%Role{}, role_params)
      |> User.put_assoc(role_params)

    case Repo.insert(changeset) do
      {:ok, role} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", role_path(conn, :show, role))
        |> render("show.json", role: role)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    role =
      Repo.get!(Role, id)
      |> Repo.preload(:users)

    render(conn, "show.json", role: role)
  end

  def update(conn, %{"id" => id, "role" => role_params}) do
    role = Repo.get!(Role, id) |> Repo.preload(:users)

    changeset =
      Role.changeset(role, role_params)
      |> User.put_assoc(role_params)

    case Repo.update(changeset) do
      {:ok, role} ->
        render(conn, "show.json", role: role)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    role = Repo.get!(Role, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(role)

    send_resp(conn, :no_content, "")
  end
end
