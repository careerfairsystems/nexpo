defmodule Nexpo.StudentSessionTimeSlotController do
  use Nexpo.Web, :controller

  alias Nexpo.{Company, StudentSessionTimeSlot}

  alias Guardian.Plug.{EnsurePermissions}

  plug EnsurePermissions, [handler: Nexpo.SessionController,
                           one_of: [%{default: ["read_all"]},
                                    %{default: ["read_companies"]}]
                          ] when action in [:create]

  def create(conn, %{"student_session_time_slot" => student_session_time_slot_params, "company_id" => company_id}) do
    data = Map.put(student_session_time_slot_params, "company_id", company_id)
    company = Repo.get(Company, company_id)
    changeset = company
                |> Ecto.build_assoc(:student_session_time_slots)
                |> StudentSessionTimeSlot.changeset(data)

    case Repo.insert(changeset) do
      {:ok, _student_session_time_slot} ->
        conn
        |> redirect(to: company_path(conn, :show, company))
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end
end
