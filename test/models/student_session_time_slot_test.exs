defmodule Nexpo.StudentSessionTimeSlotTest do
  use Nexpo.ModelCase

  alias Nexpo.StudentSessionTimeSlot

  @valid_attrs %{end: ~N[2000-01-01 23:00:00], start: ~N[2000-01-01 23:00:00], used: true, company_id: -1}
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
