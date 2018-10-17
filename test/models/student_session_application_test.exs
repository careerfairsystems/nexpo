defmodule Nexpo.StudentSessionApplicationTest do
  use Nexpo.ModelCase

  alias Nexpo.StudentSessionApplication

  @valid_attrs %{company_approved: true, motivation: "some content", score: 42, student_confirmed: true, student_id: 1, company_id: 1}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = StudentSessionApplication.changeset(%StudentSessionApplication{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = StudentSessionApplication.changeset(%StudentSessionApplication{}, @invalid_attrs)
    refute changeset.valid?
  end
end
