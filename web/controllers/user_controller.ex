defmodule Nexpo.UserController do
  use Nexpo.Web, :controller
  use Guardian.Phoenix.Controller

  alias Nexpo.User
  alias Nexpo.Email
  alias Nexpo.Mailer
  alias Nexpo.MessageView
  alias Nexpo.ErrorView
  alias Nexpo.ChangesetView

  def me(conn, %{}, user, _claims) do
    conn |> put_status(200) |> render("show.json", user: user)
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
        params = %{
          password: password,
          password_confirmation: password_confirmation
        }

        changeset = User.replace_forgotten_password_changeset(user, params)
        case Repo.update(changeset) do
          {:ok, user} ->
            conn |> put_status(200)
            |> render(MessageView, "message.json", message: "Successfully changed password")
          {:error, changeset} ->
            conn |> put_status(400)
            |> render(ChangesetView, "error.json", %{changeset: changeset})
        end

    end
  end
  def replace_forgotten_password(conn, _params, _user, _claims) do
    conn |> put_status(404) |> render(ErrorView, "404.json")
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
      nil -> conn |> put_status(404) |> render(ErrorView, "404.json")
      _ -> conn |> put_status(200) |> render(MessageView, "message.json", message: "Exists")
    end
  end

  @apidoc

end
