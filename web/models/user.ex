defmodule Nexpo.User do
  use Nexpo.Web, :model

  alias Nexpo.Repo
  alias Nexpo.User

  schema "users" do
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    field :food_preferences, :string
    field :phone_number, :string
    field :hashed_password, :string
    field :password, :string, virtual: true
    field :signup_key, :string
    field :forgot_password_key, :string
    field :forgot_password_time, :naive_datetime

    many_to_many :roles, Nexpo.Role, join_through: "users_roles", on_replace: :delete
    has_one :student, Nexpo.Student, on_delete: :delete_all

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:email, :password, :first_name, :last_name])
    |> cast(params, [:food_preferences, :phone_number])
    |> unique_constraint(:email)
    |> validate_length(:password, min: 6)
    |> hash_password(params)
    |> validate_required([:email, :hashed_password])
  end

  def get_permissions(user) do
    Repo.all(from(
      role in Ecto.assoc(user, :roles),
      select: role.permissions)
    )
    |> List.flatten
  end

  def put_assoc(changeset, params) do
    case Map.get(params, "user_ids") do
      nil ->
        changeset
      user_ids ->
        users = get_assoc(user_ids)
        changeset
        |> Ecto.Changeset.put_assoc(:users, users)
    end
  end

  defp get_assoc(user_ids) do
    Repo.all(from(
      user in User,
      where: user.id in ^user_ids)
    )
  end

  def replace_forgotten_password_changeset(user, params \\ %{}) do
    user
    |> cast(params, [:password])
    |> validate_required(:password)
    |> validate_length(:password, min: 6)
    |> validate_confirmation(:password, required: true)
    |> hash_password(params)
    |> put_change(:forgot_password_key, nil)
  end

  def initial_signup_changeset(%Nexpo.User{} = user, params \\ %{}) do
    user
    |> cast(params, [:email, :signup_key])
    |> validate_change(:email, fn :email, email ->

      cond do
        # Email canot be empty
        email == "" -> [email: "Email cannot be empty"]

        # Validate username is not empty
        !String.contains?(email, "@") -> [email: "Has to include @"]

        # Validate email does not contains whitespace
        String.contains?(email, " ") -> [email: "Cannot contain blank spaces"]

        # Return no errors if the above does not match
        true -> []
      end
    end)
    |> update_change(:email, &String.downcase(&1) )
    |> generate_signup_key()
    |> validate_required([:email, :signup_key])
    |> unique_constraint(:email, message: "Has already been taken")
  end

  def final_signup_changeset(user, params \\ %{}) do
    user
    |> cast(params, [:password, :first_name, :last_name])
    |> validate_required(:password)
    |> validate_length(:password, min: 6)
    |> validate_confirmation(:password, required: true)
    |> hash_password(params)
    |> put_change(:signup_key, nil)
    |> validate_required([:email, :hashed_password, :first_name, :last_name])
    |> unique_constraint(:email)
  end

  def forgot_password_changeset(user, params \\ %{}) do
    changeset(user, params)
    |> generate_forgot_password_key()
  end

  def authenticate(%{:email => email, :password => password}) do
    case Repo.get_by(User, email: email) do
      nil -> {:error, "No such user"}
      user ->
        case Comeonin.Bcrypt.checkpw(password, user.hashed_password) do
          true -> {:ok, user}
          false -> {:error, "Incorrect password"}
        end
    end
  end

  defp generate_signup_key(changeset) do
    changeset |> put_change(:signup_key, random_hash(150))
  end

  defp generate_forgot_password_key(changeset) do
    changeset
    |> put_change(:forgot_password_key, random_hash(150))
    |> put_change(:forgot_password_time, DateTime.utc_now)
  end

  defp random_hash(length) do
    :crypto.strong_rand_bytes(length)
    |> Base.url_encode64
    |> binary_part(0, length)
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

  # Does the initial signup
  def initial_signup(%{:email => email}) do
    User.initial_signup_changeset(%User{}, %{email: email})
    |> Repo.insert
  end

  def initial_signup!(%{:email => email}) do
    User.initial_signup_changeset(%User{}, %{email: email})
    |> Repo.insert!
  end

  def final_signup(params) do
    case Repo.get_by(User, signup_key: params.signup_key) do
      nil -> :no_such_user
      user ->
        Repo.preload(user, :student)
        |> User.final_signup_changeset(params)
        |> Nexpo.Student.build_assoc(user)
        |> Repo.update
    end
  end

  def final_signup!(params) do
    case Repo.get_by(User, signup_key: params.signup_key) do
      nil -> :no_such_user
      user ->
        Repo.preload(user, :student)
        |> User.final_signup_changeset(params)
        |> Nexpo.Student.build_assoc(user)
        |> Repo.update!
    end
  end

  def forgot_password_key_valid(user) do
    time_key = user.forgot_password_time
    time_key = try do
      time_key |> DateTime.to_unix
    rescue
      FunctionClauseError ->
        DateTime.from_naive!(time_key, "Etc/UTC") |> DateTime.to_unix
    end

    time_now = DateTime.utc_now |> DateTime.to_unix
    time_diff = time_now - time_key # in seconds
    case time_diff do
      x when x < 60 * 60 -> true # on hour
      _ -> false
    end
  end
end
