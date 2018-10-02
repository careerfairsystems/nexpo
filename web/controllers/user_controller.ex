defmodule Nexpo.UserController do
  use Nexpo.Web, :controller
  use Guardian.Phoenix.Controller

  alias Nexpo.{User, Role, Email, Mailer}
  alias Guardian.Plug.{EnsurePermissions}

  plug EnsurePermissions, [handler: Nexpo.SessionController,
                           one_of: [%{default: ["read_all"]},
                                    %{default: ["read_users"]}]
                          ] when action in [:index, :show]
  plug EnsurePermissions, [handler: Nexpo.SessionController,
                           one_of: [%{default: ["write_all"]},
                                    %{default: ["write_users"]}]
                          ] when action in [:update, :delete]

  def index(conn, %{}, _user, _claims) do
    users = Repo.all(User)
    render(conn, "index.json", users: users)
  end

  def show(conn, %{"id" => id}, _user, _claims) do
    user = Repo.get!(User, id) |> Repo.preload([:roles, :student])

    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}, _user, _claims) do
    user = Repo.get!(User, id)
           |> Repo.preload([:roles, :student])

    changeset = User.changeset(user, user_params)
                |> Role.put_assoc(user_params)

    case Repo.update(changeset) do
      {:ok, user} ->
        render(conn, "show.json", user: user)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}, _user, _claims) do
    user = Repo.get!(User, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(user)

    send_resp(conn, :no_content, "")
  end

  def show_me(conn, %{}, user, _claims) do
    user = Repo.preload(user, [:roles, [student: [student_session_applications: :company]]])
          |> User.company_assoc
    conn |> put_status(200) |> render("show.json", user: user)
  end

  def update_me(conn, %{"user" => user_params}, user, _claims) do
    user = Repo.preload(user, [:roles, :student])
    changeset = User.changeset(user, user_params)

    case Repo.update(changeset) do
      {:ok, user} ->
        render(conn, "show.json", user: user)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete_me(conn, %{}, user, _claims) do
    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(user)

    send_resp(conn, :no_content, "")
  end

  @apidoc """
  @api {POST} /password/forgot Init reset of password
  @apiGroup Forgot password

  @apiParam {String}  email   Email of user

  @apiSuccessExample {json} Success
    HTTP 200 OK
    {
      "type": "message",
      "data": "Sending email if user exists"
    }

  @apiUse BadRequestError
  """
  def forgot_password_init(conn, %{"email" => email}, _user, _claims) do
    user = Repo.get_by(User, email: email)
    if user != nil do
      user = User.forgot_password_changeset(user) |> Repo.update!
      Email.reset_password(user) |> Mailer.deliver_later
    end

    conn
    |> put_status(200)
    |> render(Nexpo.MessageView, "message.json", message: "Sending mail if user exists")
  end

  @apidoc """
  @api {POST} /password/new/:key Reset forgotten password
  @apiGroup Forgot password

  @apiParam {String}  key                   Key representing this password reset
  @apiParam {String}  password              New password
  @apiParam {String}  password_confirmation Confirmation of password

  @apiSuccessExample {json} Success
    HTTP 200 OK
    {
      "type": "message",
      "data": "Successfully changed password"
    }

  @apiUse NotFoundError
  @apiUse BadRequestError
  """
  def replace_forgotten_password(conn, %{"password" => password, "password_confirmation" => password_confirmation, "key" => key}, _user, _claims) do
    case Repo.get_by(User, forgot_password_key: key) do
      nil ->
        replace_forgotten_password(conn, nil, nil, nil)
      user ->
        case User.forgot_password_key_valid(user) do
          true ->
            params = %{
              password: password,
              password_confirmation: password_confirmation
            }

            changeset = User.replace_forgotten_password_changeset(user, params)
            case Repo.update(changeset) do
              {:ok, _user} ->
                conn |> put_status(200)
                |> render(Nexpo.MessageView, "message.json", message: "Successfully changed password")
              {:error, changeset} ->
                conn |> put_status(400)
                |> render(Nexpo.ChangesetView, "error.json", %{changeset: changeset})
            end
          false ->
            replace_forgotten_password(conn, nil, nil, nil)
        end

    end
  end

  def replace_forgotten_password(conn, _params, _user, _claims) do
    conn |> put_status(404) |> render(Nexpo.ErrorView, "404.json")
  end

  @apidoc """
  @api {GET} /password/forgot/:key Verify password forgotten
  @apiGroup Forgot password

  @apiParam {String}  key   Key representing a password reset

  @apiSuccessExample {json} Success
    HTTP 200 OK
    {
      "type": "message",
      "data": "Exists"
    }

  @apiUse NotFoundError
  @apiUse BadRequestError
  """
  def forgot_password_verification(conn, %{"key" => key}, _user, _claims) do
    case Repo.get_by(User, forgot_password_key: key) do
      nil ->
        forgot_password_verification(conn, nil, nil, nil)
      user ->
        case User.forgot_password_key_valid(user) do
          true ->
            conn |> put_status(200) |> render(Nexpo.MessageView, "message.json", message: "Exists")
          false ->
            forgot_password_verification(conn, nil, nil, nil)
        end
    end
  end

  def forgot_password_verification(conn, _, _, _) do
    conn |> put_status(404) |> render(Nexpo.ErrorView, "404.json")
  end

  @apidoc

end
