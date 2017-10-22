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
      email: sequence("Generated@email.com")
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
  Create a CompanyCategory
  """
  def company_category_factory do
    %Nexpo.CompanyCategory{
      title: sequence("Generated Category"),
    }
  end

  @doc """
  Give a CompanyCategory attributes
  """
  def with_attributes(%Nexpo.CompanyCategory{} = category, amount \\ 3) do
    insert_list(amount, :company_attribute, %{category: category})
    category
  end

  @doc """
  Create a CompanyAttribute
  """
  def company_attribute_factory do
    %Nexpo.CompanyAttribute{
      title: sequence("Generated Attribute"),
      type: sequence("Generated type"),
      value: sequence("Generated value"),

      category: build(:company_category),
    }
  end

  @doc """
  Create a CompanyEntry
  """
  def company_entry_factory do
    %Nexpo.CompanyEntry{
      value: sequence("Generated value"),

      company: build(:company),
      attribute: build(:company_attribute)
    }
  end

  @doc """
  Create a Company
  """
  def user_factory do
    %Nexpo.User{
      email: sequence(:username, &"username-#{&1}@student.lu.se"),
      password: sequence("63n3r4t3dP4ssw0rd")
    }
  end

  @doc """
  Factory for initial_signup
  """
  def initial_signup_factory do
    %{
      username: sequence("Generated username")
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
