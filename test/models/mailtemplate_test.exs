defmodule Nexpo.MailtemplateTest do
  use Nexpo.ModelCase

  alias Nexpo.Mailtemplate

  @valid_attrs %{
    content: "some content",
    name: "some content",
    signature: "some content",
    subject: "some content"
  }
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Mailtemplate.changeset(%Mailtemplate{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Mailtemplate.changeset(%Mailtemplate{}, @invalid_attrs)
    refute changeset.valid?
  end
end
