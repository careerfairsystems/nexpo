defmodule Nexpo.User do
  use Nexpo.Web, :model

  schema "users" do
    field :email, :string
    field :hashed_password, :string
    field :password, :string, virtual: true

    timestamps()
  end

  def changeset(%Nexpo.User{} = user, params \\ %{}) do
    # Check whether we are creating new user or not.
    # Is there a better way to do this without check db?
    case user.id do
      nil -> new_changeset(%Nexpo.User{}, params)
      _ -> alter_changeset(user, params)
    end
  end

  defp new_changeset(%Nexpo.User{}, params) do
    %Nexpo.User{}
    |> cast(params, [:email, :password])
    |> validate_required([:email, :password])
    |> unique_constraint(:email)
    |> validate_length(:password, min: 6)
    |> hash_password(params)
  end

  defp alter_changeset(struct, params) do
    struct
    |> cast(params, [:email, :password])
    |> unique_constraint(:email)
    |> validate_length(:password, min: 6)
    |> hash_password(params)
  end

  defp hash_password(changeset, params) do
    case Map.get(params, :password) do
      nil ->
        changeset
      password ->
        changeset
        |> put_change(:hashed_password, hash_string(password))
        |> delete_change(:password)
    end
  end

  defp hash_string(string) do
    case string do
      nil -> nil
      string -> Comeonin.Bcrypt.hashpwsalt(string)
    end
  end

  def authenticate(%{:email => email, :password => password}) do
    case Nexpo.Repo.get_by(Nexpo.User, email: email) do
      nil -> {:error, "No such user"}
      user ->
        case Comeonin.Bcrypt.checkpw(password, user.hashed_password) do
          true -> {:ok, user}
          false -> {:error, "Incorrect password"}
        end
    end
  end

end
