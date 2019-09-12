defmodule Nexpo.BlipController do
  use Nexpo.Web, :controller

  alias Nexpo.Blip

  def index(conn, _params) do
    blips = Repo.all(Blip)
    render(conn, "index.json", blips: blips)
  end

  def create(conn, %{"blip" => blip_params}) do
    changeset = Blip.changeset(%Blip{}, blip_params)

    case Repo.insert(changeset) do
      {:ok, blip} ->
        conn
        |> put_status(:created)
        |> render("show.json", blip: blip)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
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
