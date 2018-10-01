defmodule Nexpo.RepresentativeTest do
  use Nexpo.ModelCase

  alias Nexpo.Representative

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Representative.changeset(%Representative{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Representative.changeset(%Representative{}, @invalid_attrs)
    refute changeset.valid?
  end
end
