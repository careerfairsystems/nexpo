defmodule Nexpo.BlipController do
  use Nexpo.Web, :controller
  # I denna version av phoenix lägger denna raden till User och "claims" till varje request
  use Guardian.Phoenix.Controller
  import Ecto.Query
  alias Nexpo.Blip

  # TODO Lägg in company_id i alla requests istället för user
  def index(conn, %{"student_id" => student_id}, user, _claims) do
    company_id =
      user
      |> Repo.preload(:representative)
      |> Map.get(:representative)
      |> Map.get(:company_id)

    # Move to model getter
    %{
      comment: comment,
      rating: rating,
      student_id: student_id,
      inserted_at: blip_time,
      student: %{
        year: year,
        resume_en_url: resume_en_url,
        resume_sv_url: resume_sv_url,
        user: %{
          first_name: first_name,
          last_name: last_name,
          email: email,
          programme: %{name: programme_name, code: programme_code}
        }
      }
    } =
      from(b in Blip,
        where: b.company_id == ^company_id and b.student_id == ^student_id
      )
      # ordered by creation time
      |> Repo.one()
      |> Repo.preload([
        [student: [:user, :programme]]
      ])

    student = "haj du"

    render(conn, "student.json", student: student)
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

  # Should be protected with guardian so that only company reps can reach
  # TODO If doesn't exist we should create it.
  # Ska vi se till att siffran är inom 1-5 eller låta frontend
  def update(conn, %{"student_id" => student_id} = blip_params, user, _claims) do
    company_id =
      user
      |> Repo.preload(:representative)
      |> Map.get(:representative)
      |> Map.get(:company_id)

    from(b in Blip,
      where: b.company_id == ^company_id and b.student_id == ^student_id
    )
    |> Repo.one()
    |> Blip.changeset(blip_params)
    |> Repo.update()
    |> case do
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
