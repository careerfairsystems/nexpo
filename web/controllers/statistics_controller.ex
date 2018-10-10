defmodule Nexpo.StatisticsController do
  use Nexpo.Web, :controller

  alias Nexpo.Statistics

  def index(conn, _params) do
    statistics = Statistics.getAll()
    render(conn, "index.json", statistics: statistics)
  end

  def create(conn, %{"statistics" => statistics_params}) do
    changeset = Statistics.changeset(%Statistics{}, statistics_params)

    case Repo.insert(changeset) do
      {:ok, statistics} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", statistics_path(conn, :show, statistics))
        |> render("show.json", statistics: statistics)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    statistics = Statistics
      |> Statistics.get()
      |> Repo.get(id)
    render(conn, "show.json", statistics: statistics)
  end

  def update(conn, %{"id" => id, "statistics" => statistics_params}) do
    statistics = Repo.get!(Statistics, id)
    changeset = Statistics.changeset(statistics, statistics_params)

    case Repo.update(changeset) do
      {:ok, statistics} ->
        render(conn, "show.json", statistics: statistics)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    statistics = Repo.get!(Statistics, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(statistics)

    send_resp(conn, :no_content, "")
  end
end
