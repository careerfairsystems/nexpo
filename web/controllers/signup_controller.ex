defmodule Nexpo.SignupController do
  use Nexpo.Web, :controller

  alias Nexpo.Repo
  alias Nexpo.{User, Company, Student, Representative}
  alias Nexpo.{Email, Mailer}
  alias Nexpo.ErrorView
  alias Nexpo.ChangesetView
  alias Nexpo.UserView

  alias Guardian.Plug.{EnsurePermissions}

  plug(
    EnsurePermissions,
    [
      handler: Nexpo.SessionController,
      one_of: [%{default: ["write_all"]}, %{default: ["write_users"]}]
    ]
    when action in [:create_representative]
  )

  @apidoc """
  @api {POST} /initial_signup Initiate sign up
  @apiGroup Sign up

  @apiParam {String} email

  @apiSuccessExample {json} Success
    HTTP 201 Created
    {
      "data": {
        "id": 1,
        "email": "username@domain"
        "first_name": null,
        "last_name": null,
      }
    }

  @apiUse BadRequestError
  """
  def create(conn, %{"email" => email}) do
    case User.initial_signup(%{email: email}) do
      {:ok, user} ->
        Email.pre_signup_email(user) |> Mailer.deliver_later()
        Student.build_assoc!(user)

        conn
        |> put_status(201)
        |> render(UserView, "show.json", %{user: user})

      {:error, changeset} ->
        conn
        |> put_status(400)
        |> render(ChangesetView, "error.json", changeset: changeset)
    end
  end

  def seeder(conn, params) do
    user =
      params
      |> Map.get(:email, "student@fake.com")
      |> get_or_make_user()
      |> Repo.preload([:student, :representative])

    conn
    |> put_status(200)
    |> render(UserView, "show.json", %{user: user})
  end

  def seeder2(conn, params) do
    company =
      Repo.get_by(Company, name: "fake inc") ||
        %Company{}
        |> Company.changeset(%{
          name: "fake inc",
          description: "a fake company",
          website: "fake.com"
        })
        |> Repo.insert!()

    user =
      params
      |> Map.get(:email, "rep@fake.com")
      |> get_or_make_user()
      |> Representative.build_assoc!(company.id)
      |> Repo.preload([:student, :representative])

    conn
    |> put_status(200)
    |> render(UserView, "show.json", %{user: user})
  end

  defp get_or_make_user(fake_email) do
    Nexpo.User
    |> Repo.get_by(email: fake_email)
    |> case do
      %User{} = user ->
        user

      nil ->
        user =
          %User{}
          |> User.initial_signup_changeset(%{email: fake_email})
          |> Repo.insert!()
          |> Student.build_assoc!()

        password = "passsword"

        %{
          password: password,
          password_confirmation: password,
          first_name: "Fake first_name",
          last_name: "Fake last_name"
        }
        |> Map.put(:signup_key, user.signup_key)
        |> User.final_signup!()
    end
  end

  def create_representative(conn, %{"email" => email, "company_id" => company_id}) do
    case User.initial_signup(%{email: email}) do
      {:ok, user} ->
        user |> Email.pre_signup_email() |> Mailer.deliver_later()
        Representative.build_assoc!(user, company_id)

        conn
        |> put_status(201)
        |> render(UserView, "show.json", %{user: user})

      {:error, changeset} ->
        conn
        |> put_status(400)
        |> render(ChangesetView, "error.json", changeset: changeset)
    end
  end

  @apidoc """
  @api {GET} /initial_signup/:signup_key Get current signup
  @apiGroup Sign up

  @apiParam {String} signup_key Signup key of user

  @apiSuccessExample {json} Success
    HTTP 200 Created
    {
      "data": {
        "id": 1,
        "email": "username@domain"
        "first_name": "Benjamin",
        "last_name": "Franklin",
      }
    }

  @apiUse NotFoundError
  """
  def get_current_signup(conn, %{"key" => key}) do
    case Repo.get_by(User, signup_key: key) do
      nil ->
        conn
        |> put_status(404)
        |> render(ErrorView, "404.json")

      user ->
        conn
        |> put_status(200)
        |> render(UserView, "show.json", %{user: user})
    end
  end

  @apidoc """
  @api {POST} /final_signup/:signup_key Finish sign up
  @apiGroup Sign up

  @apiParam {String}  signup_key             Signup key of user
  @apiParam {String}  password               Wanted password
  @apiParam {String}  password_confirmation  Confirmation of password
  @apiParam {String}  first_name             First name
  @apiParam {String}  last_name              Last name

  @apiSuccessExample {json} Success
    HTTP 200 OK
    {
      "data": {
        "id": 1,
        "email": "username@student.lu.se"
        "first_name": "Benjamin",
        "last_name": "Franklin",
      }
    }

  @apiUse NotFoundError
  @apiUse BadRequestError
  """
  def final_create(conn, params) do
    params = %{
      signup_key: params["signup_key"],
      password: params["password"],
      password_confirmation: params["password_confirmation"],
      first_name: params["first_name"],
      last_name: params["last_name"],
      phone_number: params["phone_number"]
    }

    case User.final_signup(params) do
      {:ok, user} ->
        Email.completed_sign_up_mail(user) |> Mailer.deliver_later()

        conn
        |> put_status(200)
        |> render(UserView, "show.json", %{user: user})

      {:error, changeset} ->
        conn
        |> put_status(400)
        |> render(ChangesetView, "error.json", changeset: changeset)

      :no_such_user ->
        conn
        |> put_status(404)
        |> render(ErrorView, "404.json")
    end
  end

  @apidoc
end
