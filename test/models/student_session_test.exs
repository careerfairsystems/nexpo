defmodule Nexpo.StudentSessionTest do
  use Nexpo.ModelCase

  alias Nexpo.StudentSession

  @valid_attrs %{
    end: ~N[2000-01-01 23:00:00],
    start: ~N[2000-01-01 23:00:00],
    student_id: 1,
    company_id: 1,
    student_session_time_slot_id: 1
  }
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
