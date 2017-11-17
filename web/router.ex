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

    get "/me", UserController, :me
  end

  # Not-protected endpoints
  scope "/api", Nexpo do
    pipe_through :api

    resources "/companies", CompanyController, only: [:index, :show]
    resources "/categories", CompanyCategoryController, only: [:index, :show]

    post "/login", SessionController, :create
    if Mix.env != :prod do
      post "/development_login", SessionController, :development_create
    end
    post "/initial_signup", SignupController, :create
    get "/initial_signup/:key", SignupController, :get_current_signup
    post "/final_signup/:signup_key", SignupController, :final_create

  end

   scope "/", Nexpo do
    pipe_through :browser # Use the default browser stack

    # Catch all other routes, and serve frontend from them
    get "/*path", PageController, :serve_frontend
  end

end
