defmodule Nexpo.StudentSessionTimeSlotController do
  use Nexpo.Web, :controller
  use Guardian.Phoenix.Controller

  alias Nexpo.{Student, StudentSessionTimeSlot}

  def create(conn, %{"student_session_time_slot" => student_session_time_slot_params}, user, _claims) do
    student = Repo.get_by!(Student, %{user_id: user.id})

    data = Map.put(student_session_time_slot_params, "student_id", student.id)
    changeset = student
                |> Ecto.build_assoc(:student_session_applications)
                |> StudentSessionTimeSlot.changeset(data)

    case Repo.insert(changeset) do
      {:ok, _application} ->
        conn
        |> redirect(to: user_path(conn, :show_me, %{}))
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end
end
