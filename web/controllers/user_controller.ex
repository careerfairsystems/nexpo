defmodule Nexpo.UserController do
  use Nexpo.Web, :controller

  alias Nexpo.Repo
  alias Nexpo.User
  alias Nexpo.Email
  alias Nexpo.Mailer
  alias Nexpo.ErrorView
  alias Nexpo.ChangesetView

  def create(conn, %{"username" => username}) do
    case User.initial_signup(%{username: username}) do
      {:ok, user} ->
        Email.pre_signup_email(user) |> Mailer.deliver_later
        conn
        |> put_status(201)
        |> render("pre_signup.json", %{})
      {:error, _changeset} ->
        conn
        |> put_status(400)
        |> render(ErrorView, "400.json")
    end
  end

  def get_current_signup(conn, %{"key" => key}) do
    case Repo.get_by(User, signup_key: key) do
      nil ->
        conn
        |> put_status(404)
        |> render(ErrorView, "404.json")
      user ->
        conn
        |> put_status(200)
        |> render("show.json", %{user: user})
    end
  end

  def final_create(conn, params) do
    params = %{
      signup_key: params["signup_key"],
      password: params["password"],
      password_confirmation: params["passwordConfirmation"]
    }
    case User.final_signup(params) do
      {:ok, user} ->
        Email.completed_sign_up_mail(user) |> Mailer.deliver_later
        conn
        |> put_status(200)
        |> render("show.json", %{user: user})
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

end
