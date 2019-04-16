# Makes sure Exmachina works
{:ok, _} = Application.ensure_all_started(:ex_machina)

ExUnit.start()

Ecto.Adapters.SQL.Sandbox.mode(Nexpo.Repo, :manual)
