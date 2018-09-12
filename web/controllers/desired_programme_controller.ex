defmodule Nexpo.DesiredProgrammeController do
  use Nexpo.Web, :controller

  alias Nexpo.{Programme, DesiredProgramme}

  def create(conn, %{"desired_programme" => desired_programmes_params, "programme_id" => programme_id}) do
    data = Map.put(desired_programmes_params, "programme_id", programme_id)
    programme = Repo.get(Programme, programme_id)
    changeset = programme
                |> Ecto.build_assoc(:desired_programmes)
                |> DesiredProgramme.changeset(data)

    case Repo.insert(changeset) do
      {:ok, data} ->
        conn
        |> redirect(to: programme_path(conn, :show, programme))
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end
end
