use Mix.Config

config :nexpo,
  frontend_url: "https://" <> System.get_env("HEROKU_APP_NAME") <> ".herokuapp.com"
