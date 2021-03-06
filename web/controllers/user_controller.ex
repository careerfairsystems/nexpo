defmodule Nexpo.UserController do
  use Nexpo.Web, :controller
  use Guardian.Phoenix.Controller

  alias Nexpo.{User, ProfileImage, Email, Mailer}
  alias Guardian.Plug.{EnsurePermissions}

  plug(
    EnsurePermissions,
    [
      handler: Nexpo.SessionController,
      one_of: [%{default: ["read_all"]}, %{default: ["read_users"]}]
    ]
    when action in [:index, :show]
  )

  plug(
    EnsurePermissions,
    [
      handler: Nexpo.SessionController,
      one_of: [%{default: ["write_all"]}, %{default: ["write_users"]}]
    ]
    when action in [:update, :delete]
  )

  def index(conn, %{}, _user, _claims) do
    users =
      Repo.all(User)
      |> Repo.preload([
        :roles,
        student: [:interests, :programme, :student_sessions, :student_session_applications],
        representative: [:company]
      ])

    render(conn, "index.json", users: users)
  end

  def show(conn, %{"id" => id}, _user, _claims) do
    user =
      Repo.get!(User, id)
      |> Repo.preload([
        :roles,
        student: [:interests, :programme, :student_sessions, :student_session_applications],
        representative: [:company]
      ])

    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}, _user, _claims) do
    user =
      Repo.get!(User, id)
      |> Repo.preload([
        :roles,
        student: [:interests, :programme, :student_sessions, :student_session_applications]
      ])

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

  def delete(conn, %{"id" => id}, _user, _claims) do
    user = Repo.get!(User, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(user)

    send_resp(conn, :no_content, "")
  end

  @apidoc """
  @api {GET} api/me Request user information

  @apiGroup User

  @apiSuccessExample {json} Success
    HTTP 200 OK
    {
      "data": {
          "student": {
              "year": 2019,
              "user_id": 000,
              "student_sessions": [],
              "student_session_applications": [],
              "resume_sv_url": null,
              "resume_en_url": null,
              "programme": {
                  "name": "D-Guild",
                  "id": 7,
                  "code": "D"
              },
              "id": 000
          },
          "roles": [
              {
                  "type": "admin",
                  "permissions": [
                      "read_all",
                      "write_all"
                  ],
                  "id": 1
              }
          ],
          "representative": null,
          "phone_number": "0713371337",
          "last_name": "Developer",
          "id": 000,
          "food_preferences": null,
          "first_name": "Developer",
          "email": "developer@nexpo.com"
      }
  }

  @apiUse BadRequestError
  """
  def show_me(conn, %{}, user, _claims) do
    user =
      Repo.preload(user, [
        :roles,
        student: [
          :programme,
          :interests,
          student_sessions: [:company, :student_session_time_slot],
          student_session_applications: :company
        ],
        representative: [:company]
      ])

    conn |> put_status(200) |> render("show.json", user: user)
  end

  @apidoc """
  @api {POST} api/me Update user information
  @apiGroup User
  @apiParam {json} User Same structure as information recieved when requesting information
  @apiSuccessExample {json} Success
    HTTP 200 OK
  @apiUse BadRequestError
  """
  def update_me(conn, %{"user" => user_params}, user, _claims) do
    changeset = User.changeset(user, user_params)

    Map.keys(user_params)
    |> Enum.filter(fn k -> k in ["profile_image"] end)
    |> Enum.each(fn k ->
      delete_file?(user, user_params, String.to_atom(k))
    end)

    case Repo.update(changeset) do
      {:ok, user} ->
        render(conn, "show.json", user: user)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  @apidoc """
  @api {DELETE} api/me Delete user
  @apiGroup User
  @apiSuccessExample {json} Success
    HTTP 200 OK
  @apiUse BadRequestError
  """
  def delete_me(conn, %{}, user, _claims) do
    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(user)

    send_resp(conn, :no_content, "")
  end

  @apidoc """
  @api {POST} api/password/forgot Init reset of password
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
    user = Repo.get_by(User, email: email |> String.downcase())

    if user != nil and user.hashed_password != nil do
      user = User.forgot_password_changeset(user) |> Repo.update!()
      Email.reset_password(user) |> Mailer.deliver_later()
    end

    conn
    |> put_status(200)
    |> render(Nexpo.MessageView, "message.json", message: "Sending mail if user exists")
  end

  @apidoc """
  @api {POST} api/password/new/:key Reset forgotten password
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
  def replace_forgotten_password(
        conn,
        %{"password" => password, "password_confirmation" => password_confirmation, "key" => key},
        _user,
        _claims
      ) do
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
                conn
                |> put_status(200)
                |> render(Nexpo.MessageView, "message.json",
                  message: "Successfully changed password"
                )

              {:error, changeset} ->
                conn
                |> put_status(400)
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
  @api {GET} api/password/forgot/:key Verify password forgotten
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
            conn
            |> put_status(200)
            |> render(Nexpo.MessageView, "message.json", message: "Exists")

          false ->
            forgot_password_verification(conn, nil, nil, nil)
        end
    end
  end

  def forgot_password_verification(conn, _, _, _) do
    conn |> put_status(404) |> render(Nexpo.ErrorView, "404.json")
  end

  defp delete_file?(model, params, attr) do
    case Map.get(model, attr) do
      nil -> nil
      existing_file -> delete_file!(model, params, attr, existing_file)
    end
  end

  defp delete_file!(model, params, attr, file) do
    case Map.get(params, Atom.to_string(attr)) do
      nil ->
        case attr do
          :profile_image -> ProfileImage.delete({file, model})
        end

      _ ->
        nil
    end
  end

  @apidoc
end
