defmodule Nexpo.StudentSessionTimeSlotController do
  use Nexpo.Web, :controller

  alias Nexpo.StudentSessionTimeSlot

  def index(conn, _params) do
    student_session_time_slots = Repo.all(StudentSessionTimeSlot)
    render(conn, "index.json", student_session_time_slots: student_session_time_slots)
  end

  def create(conn, %{"student_session_time_slot" => student_session_time_slot_params}) do
    changeset = StudentSessionTimeSlot.changeset(%StudentSessionTimeSlot{}, student_session_time_slot_params)

    case Repo.insert(changeset) do
      {:ok, student_session_time_slot} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", student_session_time_slot_path(conn, :show, student_session_time_slot))
        |> render("show.json", student_session_time_slot: student_session_time_slot)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    student_session_time_slot = Repo.get!(StudentSessionTimeSlot, id)
    render(conn, "show.json", student_session_time_slot: student_session_time_slot)
  end

  def update(conn, %{"id" => id, "student_session_time_slot" => student_session_time_slot_params}) do
    student_session_time_slot = Repo.get!(StudentSessionTimeSlot, id)
    changeset = StudentSessionTimeSlot.changeset(student_session_time_slot, student_session_time_slot_params)

    case Repo.update(changeset) do
      {:ok, student_session_time_slot} ->
        render(conn, "show.json", student_session_time_slot: student_session_time_slot)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    student_session_time_slot = Repo.get!(StudentSessionTimeSlot, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(student_session_time_slot)

    send_resp(conn, :no_content, "")
  end
end
