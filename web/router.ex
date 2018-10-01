defmodule Nexpo.Router do
  use Nexpo.Web, :router

  # Needed for Sentry error logging
  if Mix.env == :prod do
    use Plug.ErrorHandler
    use Sentry.Plug
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :fetch_flash
  end

  pipeline :api_auth do
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.EnsureAuthenticated, handler: Nexpo.SessionController
    plug Guardian.Plug.LoadResource
    plug Guardian.Plug.EnsureResource, handler: Nexpo.SessionController
  end

  # Allows us to see mails sent in dev to /sent_emails
  if Mix.env == :dev do
    forward "/sent_emails", Bamboo.EmailPreviewPlug
  end

  # Protected endpoints
  scope "/api", Nexpo do
    pipe_through [:api, :api_auth]

    get "/me", UserController, :show_me
    put "/me", UserController, :update_me
    delete "/me", UserController, :delete_me
    put "/me/student", StudentController, :update_student

    resources "/users", UserController, only: [:index, :show, :update, :delete]
    resources "/roles", RoleController

    resources "/students", StudentController do
      resources "/student_sessions", StudentSessionController
      # resources "/student_session_applications", StudentSessionApplicationController
    end

    resources "/companies", CompanyController do
      resources "/desired_programmes", DesiredProgrammeController
      resources "/student_session_time_slots", StudentSessionTimeSlotController

    end
    resources "/industries", IndustryController
    resources "/job_offers", JobOfferController
    resources "/categories", CategoryController
    resources "/programmes", ProgrammeController

    resources "/student_session_applications", StudentSessionApplicationController, only: [:create]
  end

  # Not-protected endpoints
  scope "/api", Nexpo do
    pipe_through :api

    post "/login", SessionController, :create
    if Mix.env != :prod do
      post "/development_login", SessionController, :development_create
    end
    post "/initial_signup", SignupController, :create
    get "/initial_signup/:key", SignupController, :get_current_signup
    post "/final_signup/:signup_key", SignupController, :final_create

    post "/password/forgot", UserController, :forgot_password_init
    get "/password/forgot/:key", UserController, :forgot_password_verification
    post "/password/new/:key", UserController, :replace_forgotten_password

  end

  scope "/", Nexpo do
    pipe_through :browser # Use the default browser stack

    # Catch all other routes, and serve frontend from them
    get "/*path", PageController, :serve_frontend
  end

end
