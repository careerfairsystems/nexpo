defmodule Nexpo.StudentSessionTest do
  use Nexpo.ModelCase

  alias Nexpo.StudentSession

  @valid_attrs %{end: %{day: 17, month: 4, year: 2010}, start: %{day: 17, month: 4, year: 2010}, student_id: 1, company_id: 1}
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
