defmodule Nexpo.DeadlineTest do
  use Nexpo.ModelCase

  alias Nexpo.Deadline

  @valid_attrs %{end: %{day: 17, month: 4, year: 2010}, name: "some content", start: %{day: 17, month: 4, year: 2010}}
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
