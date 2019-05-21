use Mix.Config

# Configure test watcher
if Mix.env() == :dev do
  config :mix_test_watch,
    clear: true
end

config :nexpo,
  frontend_url: "http://localhost:3000"

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :nexpo, Nexpo.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false

# watchers: [node: ["node_modules/brunch/bin/brunch", "watch", "--stdin",
# cd: Path.expand("../", __DIR__)]]

# Watch static and templates for browser reloading.
config :nexpo, Nexpo.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{priv/gettext/.*(po)$},
      ~r{web/views/.*(ex)$},
      ~r{web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set less rounds password hashing in test for faster testing
config :bcrypt_elixir, :log_rounds, 4

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

config :nexpo, Nexpo.Mailer, adapter: Bamboo.LocalAdapter

# Configure your database
config :nexpo, Nexpo.Repo,
  adapter: Ecto.Adapters.Postgres,
  database: "nexpo_dev",
  username: "nexpo",
  password: "nexpo",
  pool_size: 10

config :arc,
  # or Arc.Storage.Local
  storage: Arc.Storage.Local
