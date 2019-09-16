defmodule Nexpo.BlipController do
  use Nexpo.Web, :controller
  # I denna version av phoenix lägger denna raden till User och "claims" till varje request
  use Guardian.Phoenix.Controller
  alias Nexpo.Blip

  def index(conn, _params, _user, _claims) do
    blips = Repo.all(Blip)
    render(conn, "index.json", blips: blips)
  end

  def create(conn, blip_params, user, _claims) do
    changeset = Blip.changeset(%Blip{}, blip_params)

    case user |> Repo.preload(:representative) |> Map.get(:representative) do
      %{company_id: company_id} ->
        changeset = Ecto.Changeset.cast(changeset, %{company_id: company_id}, [:company_id])

        case Repo.insert(changeset) do
          {:ok, blip} ->
            blip = Repo.preload(blip, [:student, :company])

            conn
            |> put_status(:created)
            |> render("show.json", blip: blip)

          {:error, changeset} ->
            conn
            |> put_status(:unprocessable_entity)
            |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
        end

      nil ->
        conn
        |> put_status(:forbidden)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    blip = Repo.get!(Blip, id)
    render(conn, "show.json", blip: blip)
  end

  def update(conn, %{"id" => id, "blip" => blip_params}) do
    blip = Repo.get!(Blip, id)
    changeset = Blip.changeset(blip, blip_params)

    case Repo.update(changeset) do
      {:ok, blip} ->
        render(conn, "show.json", blip: blip)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    blip = Repo.get!(Blip, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(blip)

    send_resp(conn, :no_content, "")
  end
end
