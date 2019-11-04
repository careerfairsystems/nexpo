defmodule Nexpo.Student do
  use Nexpo.Web, :model
  use Arc.Ecto.Schema

  alias Nexpo.Repo
  alias Nexpo.Student

  schema "students" do
    field(:year, :integer)
    field(:resume_en_url, Nexpo.CvEn.Type)
    field(:resume_sv_url, Nexpo.CvSv.Type)
    field(:linked_in, :string)
    field(:master, :string)

    belongs_to(:user, Nexpo.User, foreign_key: :user_id)
    belongs_to(:programme, Nexpo.Programme, on_replace: :nilify)

    has_many(:student_sessions, Nexpo.StudentSession, on_delete: :nilify_all)

    has_many(:student_session_applications, Nexpo.StudentSessionApplication,
      on_delete: :nilify_all
    )

    many_to_many(:interests, Nexpo.Interest,
      join_through: "student_interests",
      on_delete: :delete_all,
      on_replace: :delete
    )

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:year, :user_id, :master, :linked_in])
    |> cast_attachments(params, [:resume_en_url, :resume_sv_url])
    |> validate_required([:user_id])
    |> unique_constraint(:user_id, message: "Student already has a User")
    |> foreign_key_constraint(:user_id)
  end

  def build_assoc!(user) do
    student = %Student{user_id: user.id} |> Student.changeset() |> Repo.insert!()

    Repo.preload(user, :student)
    |> Ecto.Changeset.change()
    |> Ecto.Changeset.put_assoc(:student, student)
    |> Repo.update!()
  end

  def is_available?(student, time_slot) do
    Repo.one(
      from(session in Ecto.assoc(student, :student_sessions),
        # Check that student does not already have session at the time of the given time slot
        left_join: slot in Nexpo.StudentSessionTimeSlot,
        on:
          slot.id == session.student_session_time_slot_id and
            slot.start == ^time_slot.start and slot.end == ^time_slot.end,
        where: not is_nil(slot.id),
        limit: 1,
        select: slot
      )
    )
    |> is_nil()
  end

  defp sessions_count(sessions, student_id) do
    sessions
    |> Enum.filter(&(&1.student_id == student_id))
    |> Enum.count()
  end

  defp application_compare?(sessions, %{score: s1} = appl1, %{score: s2} = appl2) when s1 == s2 do
    count1 = sessions_count(sessions, appl1.student_id)
    count2 = sessions_count(sessions, appl2.student_id)

    case count1 == count2 do
      true ->
        [true, false] |> Enum.random()

      false ->
        count1 < count2
    end
  end

  defp application_compare?(_sessions, appl1, appl2) do
    appl1.score > appl2.score
  end

  defp free?(sessions, student_id, company_id) do
    sessions
    |> Enum.filter(&(&1.student_id == student_id and &1.company_id == company_id))
    |> Enum.empty?()
  end

  def get_available(company, time_slots) do
    sessions = Nexpo.StudentSession |> Repo.all()

    Nexpo.StudentSessionApplication
    |> Repo.all()
    |> Enum.filter(&(&1.company_id == company.id))
    |> Enum.filter(&(&1.score > 0))
    |> Enum.filter(&free?(sessions, &1.student_id, company.id))
    |> Enum.sort(&application_compare?(sessions, &1, &2))
    |> Repo.preload(:student)
    |> Enum.map(& &1.student)

    # |> Enum.take(length(time_slots))
  end
end
