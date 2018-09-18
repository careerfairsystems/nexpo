defmodule Nexpo.StudentSessionApplicationTest do
  use Nexpo.ModelCase

  alias Nexpo.StudentSessionApplication

  @valid_attrs %{companyApproved: true, motivation: "some content", score: 42, studentConfirmed: true}
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
