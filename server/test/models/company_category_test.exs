defmodule Nexpo.CompanyCategoryTest do
  use Nexpo.ModelCase

  alias Nexpo.CompanyCategory

  test "changeset can change all valid params" do
    params = Factory.params_with_assocs(:company_category)
    changeset = CompanyCategory.changeset(%CompanyCategory{}, params)

    # Assert no errors
    assert length(changeset.errors) == 0
    # Assert all params were changed
    changes = changeset.changes
    assert Map.get(params, :title) == Map.get(changes, :title)
  end

  test "compulsory parameters must exist" do
    errors =
    CompanyCategory.changeset(%CompanyCategory{}, %{})
    |> Map.get(:errors)
    |> Enum.map(&Tuple.to_list(&1))

    # Test that all errors exists
    assert Enum.any?(errors, &(List.first(&1) == :title))
  end

end
