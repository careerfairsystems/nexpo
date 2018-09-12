defmodule Nexpo.ProgrammeTest do
  use Nexpo.ModelCase

  alias Nexpo.Programme

  @valid_attrs %{code: "some content", name: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Programme.changeset(%Programme{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Programme.changeset(%Programme{}, @invalid_attrs)
    refute changeset.valid?
  end
end
