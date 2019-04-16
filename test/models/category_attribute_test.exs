defmodule Nexpo.CategoryAttributeTest do
  use Nexpo.ModelCase

  alias Nexpo.CategoryAttribute

  test "changeset can change all valid params" do
    params = Factory.params_with_assocs(:category_attribute)
    changeset = CategoryAttribute.changeset(%CategoryAttribute{}, params)

    # Assert no errors
    assert length(changeset.errors) == 0
    # Assert all params were changed
    changes = changeset.changes
    assert Map.get(params, :title) == Map.get(changes, :title)
    assert Map.get(params, :category_id) == Map.get(changes, :category_id)
  end

  test "compulsory parameters must exist" do
    errors =
      CategoryAttribute.changeset(%CategoryAttribute{}, %{})
      |> Map.get(:errors)
      |> Enum.map(&Tuple.to_list(&1))

    # Test that all errors exists
    assert Enum.any?(errors, &(List.first(&1) == :title))
    assert Enum.any?(errors, &(List.first(&1) == :category_id))
  end

  test "changeset forces category to exist in other table" do
    # Create params
    params = Factory.params_with_assocs(:category_attribute)
    # Delete the corresponding company
    Repo.get(Nexpo.Category, params.category_id) |> Repo.delete!()

    changeset = CategoryAttribute.changeset(%CategoryAttribute{}, params)

    assert_raise Ecto.InvalidChangesetError, fn ->
      Repo.insert!(changeset)
    end
  end

  test "foreign keys can not be null on db level" do
    params =
      Factory.params_with_assocs(:category_attribute)
      |> Map.drop([:category_id])

    assert_raise Postgrex.Error, fn ->
      %CategoryAttribute{} |> Map.merge(params) |> Repo.insert()
    end
  end
end
