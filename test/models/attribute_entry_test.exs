defmodule Nexpo.AttributeEntryTest do
  use Nexpo.ModelCase

  alias Nexpo.AttributeEntry

  @valid_attrs %{value: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = AttributeEntry.changeset(%AttributeEntry{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = AttributeEntry.changeset(%AttributeEntry{}, @invalid_attrs)
    refute changeset.valid?
  end
end
