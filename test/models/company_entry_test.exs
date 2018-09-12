defmodule Nexpo.CompanyEntryTest do
  use Nexpo.ModelCase

  alias Nexpo.CompanyEntry

  test "changeset can change all valid params" do
    params = Factory.params_with_assocs(:company_entry)
    changeset = CompanyEntry.changeset(%CompanyEntry{}, params)

    # Assert no errors
    assert length(changeset.errors) == 0
    # Assert all params were changed
    changes = changeset.changes
    assert Map.get(params, :value) == Map.get(changes, :value)
    assert Map.get(params, :company_id) == Map.get(changes, :company_id)
    assert Map.get(params, :company_attribute_id) == Map.get(changes, :company_attribute_id)
  end

  test "compulsory parameters must exist" do
    errors =
    CompanyEntry.changeset(%CompanyEntry{}, %{})
    |> Map.get(:errors)
    |> Enum.map(&Tuple.to_list(&1))

    # Test that all errors exists
    assert Enum.any?(errors, &(List.first(&1) == :value))
    assert Enum.any?(errors, &(List.first(&1) == :company_id))
    assert Enum.any?(errors, &(List.first(&1) == :company_attribute_id))
  end

  test "changeset forces company to exist in other table" do
    # Create params
    params = Factory.params_with_assocs(:company_entry)
    # Delete the corresponding company
    Repo.get(Nexpo.Company, params.company_id) |> Repo.delete!

    changeset = CompanyEntry.changeset(%CompanyEntry{}, params)

    assert_raise Ecto.InvalidChangesetError, fn ->
      Repo.insert!(changeset)
    end
  end

  test "changeset forces company_attribute to exist in other table" do
    # Create params
    params = Factory.params_with_assocs(:company_entry)
    # Delete corresponding company attribute
    Repo.get(Nexpo.CategoryAttribute, params.company_attribute_id) |> Repo.delete!

    changeset = CompanyEntry.changeset(%CompanyEntry{}, params)

    assert_raise Ecto.InvalidChangesetError, fn ->
      Repo.insert!(changeset)
    end
  end

  test "company foreign_key can not be null on db level" do
    params =
    Factory.params_with_assocs(:company_entry)
    |> Map.drop([:company_id])

    assert_raise Postgrex.Error, fn ->
      %CompanyEntry{} |> Map.merge(params) |> Repo.insert
    end
  end

  test "company_attribute foreign_key can not be null on db level" do
    params =
    Factory.params_with_assocs(:company_entry)
    |> Map.drop([:company_attribute_id])

    assert_raise Postgrex.Error, fn ->
      %CompanyEntry{} |> Map.merge(params) |> Repo.insert
    end
  end

end
