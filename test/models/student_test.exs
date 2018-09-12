defmodule Nexpo.StudentTest do
  use Nexpo.ModelCase

  alias Nexpo.Student

  @valid_attrs %{resumeEnUrl: "some content", resumeSvUrl: "some content", year: 42, user_id: 1}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Student.changeset(%Student{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Student.changeset(%Student{}, @invalid_attrs)
    refute changeset.valid?
  end
end
