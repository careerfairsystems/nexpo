use Mix.Config

config :nexpo,
  frontend_url: "http://localhost:3000"

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :nexpo, Nexpo.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

config :nexpo, Nexpo.Mailer,
  adapter: Bamboo.TestAdapter

# Set less rounds in test for faster hashing
config :bcrypt_elixir, :log_rounds, 4

# Configure your database
config :nexpo, Nexpo.Repo,
  adapter: Ecto.Adapters.Postgres,
  database: "nexpo_test",
  pool: Ecto.Adapters.SQL.Sandbox,
  username: "nexpo",
  password: "nexpo"
