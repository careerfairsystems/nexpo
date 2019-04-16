defmodule Nexpo.MailtemplateController do
  use Nexpo.Web, :controller

  alias Nexpo.Mailtemplate
  alias Guardian.Plug.{EnsurePermissions}

  plug(
    EnsurePermissions,
    [handler: Nexpo.SessionController, default: ["read_all"]] when action in [:index, :show]
  )

  plug(
    EnsurePermissions,
    [handler: Nexpo.SessionController, default: ["write_all"]]
    when action in [:create, :update, :delete]
  )

  def index(conn, _params) do
    mailtemplates = Repo.all(Mailtemplate)
    render(conn, "index.json", mailtemplates: mailtemplates)
  end

  def create(conn, %{"mailtemplate" => mailtemplate_params}) do
    changeset = Mailtemplate.changeset(%Mailtemplate{}, mailtemplate_params)

    case Repo.insert(changeset) do
      {:ok, mailtemplate} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", mailtemplate_path(conn, :show, mailtemplate))
        |> render("show.json", mailtemplate: mailtemplate)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    mailtemplate = Repo.get!(Mailtemplate, id)
    render(conn, "show.json", mailtemplate: mailtemplate)
  end

  def update(conn, %{"id" => id, "mailtemplate" => mailtemplate_params}) do
    mailtemplate = Repo.get!(Mailtemplate, id)
    changeset = Mailtemplate.changeset(mailtemplate, mailtemplate_params)

    case Repo.update(changeset) do
      {:ok, mailtemplate} ->
        render(conn, "show.json", mailtemplate: mailtemplate)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    mailtemplate = Repo.get!(Mailtemplate, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(mailtemplate)

    send_resp(conn, :no_content, "")
  end
end
