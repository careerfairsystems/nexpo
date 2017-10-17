defmodule Nexpo.Router do
  use Nexpo.Web, :router

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

  # Other scopes may use custom stacks.
   scope "/api", Nexpo do
     pipe_through :api

     resources "/companies", CompanyController, only: [:index, :show]
     resources "/categories", CompanyCategoryController, only: [:index, :show]

   end

   scope "/", Nexpo do
    pipe_through :browser # Use the default browser stack

    # Catch all other routes, and serve frontend from them
    get "/*path", PageController, :serve_frontend
  end

end
