defmodule Nexpo.Factory do
  @moduledoc """
  Exposes ways to easily create test data

  Always define relations on the models that has the foreign key,
  create helper methods for easily creating relations on models that do not own the foreign key
  """
  use ExMachina.Ecto, repo: Nexpo.Repo

  @doc """
  Create a Company
  """
  def company_factory do
    %Nexpo.Company{
      name: sequence("Generated Company"),
      logo_url: sequence("Generated logo_url"),
      description: sequence("Generated description"),
      website: sequence("Generated website")
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
      title: sequence("Generated Category"),
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

      category: build(:category),
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
      email: sequence(:username, &"username-#{&1}@student.lu.se"),
      password: sequence("63n3r4t3dP4ssw0rd")
    }
  end

  # Allows us to easly create a user with hashed password etc
  def create_user do
    params = Nexpo.Factory.params_for(:user)
    Nexpo.User.changeset(%Nexpo.User{}, params) |> Nexpo.Repo.insert!
  end

  @doc """
  Factory for initial_signup
  """
  def initial_signup_factory do
    %{
      username: sequence("generated-username")
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
      last_name: sequence("Fake last_name"),
    }
  end

end
