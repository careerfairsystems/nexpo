defmodule Nexpo.StudentSessionTest do
  use Nexpo.ModelCase

  alias Nexpo.StudentSession

  @valid_attrs %{end_date: %{day: 18, month: 9, year: 2018}, start: %{day: 17, month: 4, year: 2010}}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = StudentSession.changeset(%StudentSession{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = StudentSession.changeset(%StudentSession{}, @invalid_attrs)
    refute changeset.valid?
  end
end
