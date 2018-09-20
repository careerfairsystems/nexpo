defmodule Nexpo.StudentSessionTimeSlotTest do
  use Nexpo.ModelCase

  alias Nexpo.StudentSessionTimeSlot

  @valid_attrs %{end: %{day: 17, hour: 14, min: 0, month: 4, sec: 0, year: 2010}, start: %{day: 17, hour: 14, min: 0, month: 4, sec: 0, year: 2010}, used: true}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = StudentSessionTimeSlot.changeset(%StudentSessionTimeSlot{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = StudentSessionTimeSlot.changeset(%StudentSessionTimeSlot{}, @invalid_attrs)
    refute changeset.valid?
  end
end
