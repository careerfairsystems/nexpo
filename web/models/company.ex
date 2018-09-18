defmodule Nexpo.Company do
  use Nexpo.Web, :model

  schema "companies" do
    field :name, :string
    field :logo_url, :string
    field :description, :string
    field :website, :string
    field :student_session_days, :integer, default: 0

    has_many :desired_programmes, Nexpo.DesiredProgramme
    has_many :student_sessions, Nexpo.StudentSession
    has_many :student_session_applications, Nexpo.StudentSessionApplication

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :logo_url, :description, :website])
    |> validate_required([:name, :logo_url, :description, :website])
    |> unique_constraint(:name)
  end
end
