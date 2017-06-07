defmodule Nexpo.CompanyEntryTest do
  use Nexpo.ModelCase

  alias Nexpo.CompanyEntry

  @valid_attrs %{value: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = CompanyEntry.changeset(%CompanyEntry{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = CompanyEntry.changeset(%CompanyEntry{}, @invalid_attrs)
    refute changeset.valid?
  end
end
