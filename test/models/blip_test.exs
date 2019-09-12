defmodule Nexpo.BlipTest do
  use Nexpo.ModelCase

  alias Nexpo.Blip

  @valid_attrs %{comment: "some content", rating: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Blip.changeset(%Blip{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Blip.changeset(%Blip{}, @invalid_attrs)
    refute changeset.valid?
  end
end
