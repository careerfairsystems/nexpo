defmodule Nexpo.JobOfferTest do
  use Nexpo.ModelCase

  alias Nexpo.JobOffer

  @valid_attrs %{type: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = JobOffer.changeset(%JobOffer{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = JobOffer.changeset(%JobOffer{}, @invalid_attrs)
    refute changeset.valid?
  end
end
