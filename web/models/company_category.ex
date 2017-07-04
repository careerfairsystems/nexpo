defmodule Nexpo.CompanyCategory do
  use Nexpo.Web, :model
   # This modell represents a company:
   # title: company title
   # id: company id
   schema "company_categories" do
     field :title, :string

     has_many :attributes, Nexpo.CompanyAttribute

     timestamps()
   end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title])
    |> validate_required([:title])
  end
end
