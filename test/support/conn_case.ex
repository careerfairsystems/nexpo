defmodule Nexpo.ConnCase do
  @moduledoc """
  This module defines the test case to be used by
  tests that require setting up a connection.

  Such tests rely on `Phoenix.ConnTest` and also
  import other functionality to make it easier
  to build and query models.

  Finally, if the test case interacts with the database,
  it cannot be async. For this reason, every test runs
  inside a transaction which is reset at the beginning
  of the test unless the test case is marked as async.
  """

  use ExUnit.CaseTemplate

  using do
    quote do
      # Import conveniences for testing with connections
      use Phoenix.ConnTest

      alias Nexpo.Repo
      import Ecto
      import Ecto.Changeset
      import Ecto.Query

      import Nexpo.Router.Helpers

      # Make factory work in tests
      alias Nexpo.Factory

      # The default endpoint for testing
      @endpoint Nexpo.Endpoint
    end
  end

  setup tags do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Nexpo.Repo)

    unless tags[:async] do
      Ecto.Adapters.SQL.Sandbox.mode(Nexpo.Repo, {:shared, self()})
    end

    conn =
      Phoenix.ConnTest.build_conn()
      |> Plug.Conn.put_req_header("accept", "application/json")

    # Defines default parameters for tests
    case tags[:logged_in] do
      true ->
        user = Nexpo.Factory.create_user()
        perms = %{default: ["read_all", "write_all"]}

        {_status, jwt, _decoded_jwt} = Guardian.encode_and_sign(user, %{}, perms: perms)
        conn = Plug.Conn.put_req_header(conn, "authorization", "Bearer #{jwt}")

        {:ok, conn: conn, user: user}

      _ ->
        {:ok, conn: conn}
    end
  end
end
