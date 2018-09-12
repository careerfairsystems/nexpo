defmodule Nexpo.CompanyTest do
  use Nexpo.ModelCase

  alias Nexpo.Company

  @valid_attrs %{description: "some content", logo_url: "some content", name: "some content", website: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Company.changeset(%Company{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Company.changeset(%Company{}, @invalid_attrs)
    refute changeset.valid?
  end
end
