defmodule Nexpo.Company do
  use Nexpo.Web, :model
  use Arc.Ecto.Schema

  schema "companies" do
    field :name, :string
    field :logo_url, Nexpo.ProfileImage.Type
    field :description, :string
    field :website, :string
    field :student_session_days, :integer, default: 0

    has_many :entries, Nexpo.CompanyEntry
    has_many :representatives, Nexpo.Representative
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
    |> cast(params, [:name, :description, :website, :student_session_days])
    |> cast_attachments(params, [:logo_url])
    |> validate_required([:name, :description, :website])
    |> unique_constraint(:name)
  end
end
