defmodule Nexpo.DesiredProgrammeController do
  use Nexpo.Web, :controller

  alias Nexpo.{Company, DesiredProgramme}
  alias Guardian.Plug.{EnsurePermissions}

  plug(
    EnsurePermissions,
    [handler: Nexpo.SessionController, default: ["write_all"]] when action in [:create]
  )

  def create(conn, %{"desired_programme" => desired_programmes_params, "company_id" => company_id}) do
    data = Map.put(desired_programmes_params, "company_id", company_id)
    company = Repo.get(Company, company_id)

    changeset =
      company
      |> Ecto.build_assoc(:desired_programmes)
      |> DesiredProgramme.changeset(data)

    case Repo.insert(changeset) do
      {:ok, _programme} ->
        conn
        |> redirect(to: company_path(conn, :show, company))

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end
end
