defmodule Nexpo.Student do
  use Nexpo.Web, :model

  alias Nexpo.Repo
  alias Nexpo.Student

  schema "students" do
    field :year, :integer
    field :resumeEnUrl, :string
    field :resumeSvUrl, :string
    belongs_to :user, Nexpo.User

    has_many :student_sessions, Nexpo.StudentSession
    has_many :student_session_applications, Nexpo.StudentSessionApplication

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:year, :resumeEnUrl, :resumeSvUrl, :user_id])
    |> validate_required([:year, :resumeEnUrl, :resumeSvUrl, :user_id])
    |> foreign_key_constraint(:user_id)
  end

  def build_assoc(changeset) do
    student = Repo.insert!(%Student{})
    Ecto.Changeset.put_assoc(changeset, :student, student)
  end
end
