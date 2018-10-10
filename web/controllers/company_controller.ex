defmodule Nexpo.CompanyController do
  use Nexpo.Web, :controller
  use Guardian.Phoenix.Controller

  alias Nexpo.{Company, Representative}
  alias Guardian.Plug.{EnsurePermissions}

  plug EnsurePermissions, [handler: Nexpo.SessionController,
                           one_of: [%{default: ["read_all"]},
                                    %{default: ["read_companies"]}]
                          ] when action in [:show]
  plug EnsurePermissions, [handler: Nexpo.SessionController,
                           one_of: [%{default: ["write_all"]},
                                    %{default: ["write_companies"]}]
                          ] when action in [:create, :update, :delete]

  @apidoc """
  @api {GET} /companies List companies
  @apiGroup Company
  @apiSuccessExample {json} Success
    HTTP 200 Ok
    {
      "data": [
        {
          "id": 1,
          "name": "CodeComp",
          "description": "We do code!"
        },
        {
          "id": 2,
          "name": "Other Comp",
          "description": "We do other things!"
        }
      ]
    }
  @apiUse InternalServerError
  """
  def index(conn, _params, _user, _claims) do
    companies = Repo.all(Company)
    render(conn, "index.json", companies: companies)
  end

  def create(conn, %{"company" => company_params}, _user, _claims) do
    changeset = Company.changeset(%Company{}, company_params)

    case Repo.insert(changeset) do
      {:ok, company} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", company_path(conn, :show, company))
        |> render("show.json", company: company)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  @apidoc """
  @api {GET} /companies/:id Get company
  @apiGroup Company
  @apiParam {Number} id ID of the company
  @apiSuccessExample {json} Success
    HTTP 200 Ok
    {
      "data": {
        "id": 1,
        "name": "CodeComp"
      }
    }

  @apiUse NotFoundError
  @apiUse InternalServerError
  """
  def show(conn, %{"id" => id}, _user, _claims) do
    company = Repo.get!(Company, id)
        |> Repo.preload([:users, :entries, :desired_programmes])
        |> Repo.preload([:student_sessions, :student_session_applications])
        |> Repo.preload([:student_session_time_slots])
    render(conn, "show.json", company: company)
  end

  def update(conn, %{"id" => id, "company" => company_params}, _user, _claims) do
    Company
    |> Repo.get(id)
    |> Company.changeset(company_params)
    |> update_company(conn)
  end

  def update(conn, params, _user, _claims) do
    {id, company_params} = Map.pop(params, "id")
    Company
    |> Repo.get(id)
    |> Company.changeset(company_params)
    |> update_company(conn)
  end

  defp update_company(changeset, conn) do
    case Repo.update(changeset) do
      {:ok, company} ->
        render(conn, "show.json", company: company)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}, _user, _claims) do
    company = Repo.get!(Company, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(company)

    send_resp(conn, :no_content, "")
  end

  def show_me(conn, %{}, user, _claims) do
    representative = Repo.get_by!(Representative, %{user_id: user.id})
    company = Ecto.assoc(representative, :company) |> Repo.one |> Repo.preload([:industries, :job_offers, :users, :entries, :representatives, :desired_programmes, :student_sessions, :student_session_applications, :student_session_time_slots])

    conn |> put_status(200) |> render("show.json", company: company)
  end

  def update_me(conn, %{"company" => company_params}, user, _claims) do
    representative = Repo.get_by!(Representative, %{user_id: user.id})
    company = Ecto.assoc(representative, :company) |> Repo.one |> Repo.preload([:industries, :job_offers, :users, :entries, :representatives, :desired_programmes, :student_sessions, :student_session_applications, :student_session_time_slots])
    changeset = Company.representative_changeset(company, company_params)

    case Repo.update(changeset) do
      {:ok, company} ->
        render(conn, "show.json", company: company)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete_me(conn, %{}, user, _claims) do
    representative = Repo.get_by!(Representative, %{user_id: user.id})
    company = Ecto.assoc(representative, :company)

    Repo.delete!(company)

    send_resp(conn, :no_content, "")
  end

  @apidoc
end
