defmodule Nexpo.CompanyCategoryTest do
  use Nexpo.ModelCase

  alias Nexpo.CompanyCategory

  @valid_attrs %{title: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = CompanyCategory.changeset(%CompanyCategory{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = CompanyCategory.changeset(%CompanyCategory{}, @invalid_attrs)
    refute changeset.valid?
  end
end
