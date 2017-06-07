defmodule Nexpo.CompanyAttributeTest do
  use Nexpo.ModelCase

  alias Nexpo.CompanyAttribute

  @valid_attrs %{title: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = CompanyAttribute.changeset(%CompanyAttribute{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = CompanyAttribute.changeset(%CompanyAttribute{}, @invalid_attrs)
    refute changeset.valid?
  end
end
