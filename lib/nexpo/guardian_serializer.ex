defmodule Nexpo.GuardianSerializer do
  @behaviour Guardian.Serializer

  alias Nexpo.Repo
  alias Nexpo.User

  """
  Returns a token given a user
  """
  def for_token(user = %User{}), do: { :ok, "User:#{user.id}" }
  def for_token(_), do: { :error, "Unknown resource type" }

  """
  Returns a user given a token
  """
  def from_token("User:" <> id), do: { :ok, Repo.get(User, id) }
  def from_token(_), do: { :error, "Unknown resource type" }

end
