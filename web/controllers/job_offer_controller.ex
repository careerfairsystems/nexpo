defmodule Nexpo.JobOfferController do
  use Nexpo.Web, :controller

  alias Nexpo.JobOffer

  def index(conn, _params) do
    job_offers = Repo.all(JobOffer)
    render(conn, "index.json", job_offers: job_offers)
  end

  def create(conn, %{"job_offer" => job_offer_params}) do
    changeset = JobOffer.changeset(%JobOffer{}, job_offer_params)

    case Repo.insert(changeset) do
      {:ok, job_offer} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", job_offer_path(conn, :show, job_offer))
        |> render("show.json", job_offer: job_offer)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    job_offer = Repo.get!(JobOffer, id)
    render(conn, "show.json", job_offer: job_offer)
  end

  def update(conn, %{"id" => id, "job_offer" => job_offer_params}) do
    job_offer = Repo.get!(JobOffer, id)
    changeset = JobOffer.changeset(job_offer, job_offer_params)

    case Repo.update(changeset) do
      {:ok, job_offer} ->
        render(conn, "show.json", job_offer: job_offer)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    job_offer = Repo.get!(JobOffer, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(job_offer)

    send_resp(conn, :no_content, "")
  end
end
