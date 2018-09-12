defmodule Nexpo.DesiredProgrammeTest do
  use Nexpo.ModelCase

  alias Nexpo.DesiredProgramme

  @valid_attrs %{score: 42, programme_id: 2, company_id: 1}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = DesiredProgramme.changeset(%DesiredProgramme{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = DesiredProgramme.changeset(%DesiredProgramme{}, @invalid_attrs)
    refute changeset.valid?
  end
end
