defmodule Nexpo.Student do
  use Nexpo.Web, :model
  use Arc.Ecto.Schema

  alias Nexpo.Repo
  alias Nexpo.Student

  schema "students" do
    field :year, :integer
    field :resume_en_url, Nexpo.CvEn.Type
    field :resume_sv_url, Nexpo.CvSv.Type
    belongs_to :user, Nexpo.User, foreign_key: :user_id

    has_many :student_sessions, Nexpo.StudentSession
    has_many :student_session_applications, Nexpo.StudentSessionApplication

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:year, :user_id])
    |> cast_attachments(params, [:resume_en_url, :resume_sv_url])
    |> validate_required([:user_id])
    |> unique_constraint(:user_id, message: "User already has a Student")
    |> foreign_key_constraint(:user_id)
  end

  def build_assoc(changeset, user) do
    case Repo.get_by(Student, user_id: user.id) do
      nil  ->
        student = Repo.insert!(Student.changeset(%Student{user_id: user.id}))
        Ecto.Changeset.put_assoc(changeset, :student, student)
      _ -> changeset
    end
  end
end
