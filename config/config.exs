# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :nexpo,
  ecto_repos: [Nexpo.Repo]

# Configures the endpoint
config :nexpo, Nexpo.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "GU7Agc62MhexCUPeQfbPD0emB9G9/TUF4vOU+FRi4mIayqZ5h1uhce3RMNWiZDOV",
  render_errors: [view: Nexpo.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Nexpo.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Config Guardian
config :guardian, Guardian,
  # optional
  allowed_algos: ["HS512"],
  # optional
  verify_module: Guardian.JWT,
  issuer: "nexpo",
  ttl: {30, :days},
  allowed_drift: 2000,
  # optional
  verify_issuer: true,
  # Secret key is overridden in prod config
  secret_key: "vbk9Zrn5w1D7U2zUPey37NX9DZygy1lFXMSyLCYu/VorzxFzal7dcwsqp9UU6JZC",
  serializer: Nexpo.GuardianSerializer,
  permissions: %{
    default: [
      "read_all",
      "write_all",
      "read_users",
      "write_users",
      "read_roles",
      "write_roles",
      "read_events",
      "write_events",
      "read_companies",
      "write_companies",
      "read_categories",
      "write_categories",
      "read_sessions",
      "write_sessions",
      "read_hosts",
      "write_hosts"
    ]
  }

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
