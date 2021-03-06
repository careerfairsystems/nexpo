defmodule Nexpo.Factory do
  @moduledoc """
  Exposes ways to easily create test data

  Always define relations on the models that has the foreign key,
  create helper methods for easily creating relations on models that do not own the foreign key
  """
  use ExMachina.Ecto, repo: Nexpo.Repo
  use Arc.Definition
  use Arc.Ecto.Definition

  @doc """
  Create a Company
  """
  def company_factory do
    {:ok, image} = Nexpo.CompanyLogo.Type.load("x.jpg?1234567")

    %Nexpo.Company{
      name: sequence("Generated Company"),
      logo_url: image,
      description: sequence("Generated description"),
      website: sequence("Generated website"),
      host_name: sequence("Generated host name"),
      host_mail: sequence("Generated host email"),
      host_phone_number: sequence("0733112233")
    }
  end

  @doc """
  Give a Company entries
  """
  def with_entries(%Nexpo.Company{} = company, amount \\ 3) do
    insert_list(amount, :company_entry, %{company: company})
    company
  end

  @doc """
  Create a Category
  """
  def category_factory do
    %Nexpo.Category{
      title: sequence("Generated Category")
    }
  end

  @doc """
  Give a Category attributes
  """
  def with_attributes(%Nexpo.Category{} = category, amount \\ 3) do
    insert_list(amount, :category_attribute, %{category: category})
    category
  end

  @doc """
  Create a CategoryAttribute
  """
  def category_attribute_factory do
    %Nexpo.CategoryAttribute{
      title: sequence("Generated Attribute"),
      type: sequence("Generated type"),
      value: sequence("Generated value"),
      category: build(:category)
    }
  end

  @doc """
  Create a CompanyEntry
  """
  def company_entry_factory do
    %Nexpo.CompanyEntry{
      value: sequence("Generated value"),
      company: build(:company),
      attribute: build(:category_attribute)
    }
  end

  @doc """
  Create a User
  """
  def user_factory do
    %Nexpo.User{
      email: sequence(:id, &"generated_email-#{&1}@domain.com"),
      password: sequence("63n3r4t3dP4ssw0rd")
    }
  end

  # Allows us to easly create a user with hashed password etc
  def create_user do
    user =
      :initial_signup
      |> Nexpo.Factory.params_for()
      |> Nexpo.User.initial_signup!()

    Nexpo.Student.build_assoc!(user)

    user =
      :final_signup
      |> Nexpo.Factory.params_for()
      |> Map.put(:signup_key, user.signup_key)
      |> Nexpo.User.final_signup!()

    Nexpo.User
    |> Nexpo.Repo.get!(user.id)
    |> Nexpo.Repo.preload([:student, :representative])
  end

  def seed_user do
    fake_email = "student@fake.com"

    Nexpo.User
    |> Nexpo.Repo.get_by(:email, fake_email)
    |> case do
      %{id: id} ->
        Nexpo.Repo.delete!(Nexpo.User, id)

      nil ->
        nil
    end

    user =
      %{email: "student@fake.com"}
      |> Nexpo.User.initial_signup!()

    Nexpo.Student.build_assoc!(user)

    password = sequence("passsword")

    user =
      %{
        password: password,
        password_confirmation: password,
        first_name: sequence("Fake first_name"),
        last_name: sequence("Fake last_name")
      }
      |> Map.put(:signup_key, user.signup_key)
      |> Nexpo.User.final_signup!()

    Nexpo.User
    |> Nexpo.Repo.get!(user.id)
    |> Nexpo.Repo.preload([:student, :representative])
  end

  @doc """
  Factory for initial_signup
  """
  def initial_signup_factory do
    %{
      email: sequence(:id, &"generated_user-#{&1}@domain.se")
    }
  end

  @doc """
  Factory for initial_signup
  """
  def final_signup_factory do
    password = sequence("63n3r4t3dP4ssw0rd")

    %{
      password: password,
      password_confirmation: password,
      first_name: sequence("Fake first_name"),
      last_name: sequence("Fake last_name")
    }
  end
end
