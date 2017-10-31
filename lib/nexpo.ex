defmodule Nexpo do
  use Application

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec

    children = get_children()

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Nexpo.Supervisor]

    # Configure Sentry to catch all errors in prod
    if Mix.env == :prod do
      :ok = :error_logger.add_report_handler(Sentry.Logger)
    end

    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    Nexpo.Endpoint.config_change(changed, removed)
    :ok
  end

  # Defines workers and child supervisors to be supervised
  defp get_children() do
    import Supervisor.Spec
    [
      supervisor(Nexpo.Repo, []), # Start the Ecto repository
      supervisor(Nexpo.Endpoint, []), # Start the endpoint when the application starts
      # Start your own worker by calling: Nexpo.Worker.start_link(arg1, arg2, arg3)
      # worker(Nexpo.Worker, [arg1, arg2, arg3]),
    ]
  end
end
