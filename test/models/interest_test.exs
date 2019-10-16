defmodule Nexpo.InterestTest do
  use Nexpo.ModelCase

  alias Nexpo.Interest

  @valid_attrs %{name: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Interest.changeset(%Interest{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Interest.changeset(%Interest{}, @invalid_attrs)
    refute changeset.valid?
  end
end
