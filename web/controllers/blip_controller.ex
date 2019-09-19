defmodule Nexpo.BlipController do
  use Nexpo.Web, :controller
  # I denna version av phoenix lägger denna raden till User och "claims" till varje request
  use Guardian.Phoenix.Controller
  import Ecto.Query
  alias Nexpo.Blip

  # TODO Lägg in company_id i alla requests istället för user, guardian är dum
  def index(conn, _params, user, _claims) do
    company_id =
      user
      |> Repo.preload(:representative)
      |> Map.get(:representative)
      |> Map.get(:company_id)

    blips =
      from(b in Blip,
        where: b.company_id == ^company_id
      )
      |> Repo.all()
      |> Repo.preload([
        [student: [:user, :programme]]
      ])
      |> Enum.map(fn blip ->
        blip
        |> Map.merge(blip.student)
        |> Map.merge(blip.student.user)
        |> Map.put(:blipped_at, blip.inserted_at)
        |> Map.drop([:user])
      end)
      |> IO.inspect()

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

  def show(conn, %{"student_id" => student_id}, user, _claims) do
    user
    |> get_blip(student_id)
    |> Repo.preload([
      [student: [:user, :programme]]
    ])
    |> case do
      blip = %{} ->
        student =
          blip
          |> Map.merge(blip.student)
          |> Map.merge(blip.student.user)
          |> Map.put(:blipped_at, blip.inserted_at)
          |> Map.drop([:user])

        render(conn, "student.json", student: student)

      nil ->
        send_resp(conn, :not_found, "")
    end
  end

  # Should be protected with guardian so that only company reps can reach
  # TODO If doesn't exist we should create it.
  # Ska vi se till att siffran är inom 1-5 eller låta frontend
  def update(conn, %{"student_id" => student_id} = blip_params, user, _claims) do
    get_blip(user, student_id)
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

  def delete(conn, %{"student_id" => student_id}, user, _claims) do
    user
    |> get_blip(student_id)
    |> Repo.delete!()

    send_resp(conn, :no_content, "")
  end

  defp get_blip(user, student_id) do
    company_id =
      user
      |> Repo.preload(:representative)
      |> Map.get(:representative)
      |> Map.get(:company_id)

    from(b in Blip,
      where: b.company_id == ^company_id and b.student_id == ^student_id
    )
    |> Repo.one()
  end
end
