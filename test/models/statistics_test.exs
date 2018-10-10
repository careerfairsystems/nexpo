defmodule Nexpo.StatisticsTest do
  use Nexpo.ModelCase

  alias Nexpo.Statistics

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Statistics.changeset(%Statistics{}, @valid_attrs)
    assert changeset.valid?
  end

end
