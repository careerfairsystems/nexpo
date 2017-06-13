defmodule Nexpo.CompanyAttributeTest do
  use Nexpo.ModelCase

  alias Nexpo.CompanyAttribute

  test "changeset can change all valid params" do
    params = Factory.params_with_assocs(:company_attribute)
    changeset = CompanyAttribute.changeset(%CompanyAttribute{}, params)

    # Assert no errors
    assert length(changeset.errors) == 0
    # Assert all params were changed
    changes = changeset.changes
    assert Map.get(params, :title) == Map.get(changes, :title)
    assert Map.get(params, :company_category_id) == Map.get(changes, :company_category_id)
  end

  test "compulsory parameters must exist" do
    errors =
    CompanyAttribute.changeset(%CompanyAttribute{}, %{})
    |> Map.get(:errors)
    |> Enum.map(&Tuple.to_list(&1))

    # Test that all errors exists
    assert Enum.any?(errors, &(List.first(&1) == :title))
    assert Enum.any?(errors, &(List.first(&1) == :company_category_id))
  end

  test "changeset forces company_category to exist in other table" do
    # Create params
    params = Factory.params_with_assocs(:company_attribute)
    # Delete the corresponding company
    Repo.get(Nexpo.CompanyCategory, params.company_category_id) |> Repo.delete!

    changeset = CompanyAttribute.changeset(%CompanyAttribute{}, params)

    assert_raise Ecto.InvalidChangesetError, fn ->
      Repo.insert!(changeset)
    end
  end

  test "foreign keys can not be null on db level" do
    params =
    Factory.params_with_assocs(:company_attribute)
    |> Map.drop([:company_category_id])

    assert_raise Postgrex.Error, fn ->
      %CompanyAttribute{} |> Map.merge(params) |> Repo.insert
    end
  end

end
