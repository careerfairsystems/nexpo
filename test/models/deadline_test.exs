defmodule Nexpo.DeadlineTest do
  use Nexpo.ModelCase

  alias Nexpo.Deadline

  @valid_attrs %{end: ~N[2000-01-01 23:00:00], name: "some content", start: ~N[2000-01-01 23:00:00]}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Deadline.changeset(%Deadline{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Deadline.changeset(%Deadline{}, @invalid_attrs)
    refute changeset.valid?
  end
end
