defmodule Nexpo.Endpoint do
  use Phoenix.Endpoint, otp_app: :nexpo

  socket "/socket", Nexpo.UserSocket

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phoenix.digest
  # when deploying your static files in production.
  # plug Plug.Static,
  #   at: "/", from: :nexpo, gzip: false,
  #   only: ~w(css fonts images js favicon.ico robots.txt)

  plug Plug.Static,
    at: "/",
    from: "priv/static/",
    gzip: true,
    only: ~w(index.html favicon.ico static service-worker.js)

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    socket "/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket
    plug Phoenix.LiveReloader
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId
  plug Plug.Logger

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison

  plug Plug.MethodOverride
  plug Plug.Head

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  plug Plug.Session,
    store: :cookie,
    key: "_nexpo_key",
    signing_salt: "mK2+SwZ8"

  # Enable CORS
  plug CORSPlug

  plug Nexpo.Router
end
