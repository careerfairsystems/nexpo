defmodule Nexpo.StudentSessionTimeSlot do
  use Nexpo.Web, :model

  alias Nexpo.Repo
  alias Nexpo.StudentSessionTimeSlot, as: TimeSlot

  schema "student_session_time_slots" do
    field :start, :naive_datetime
    field :end, :naive_datetime
    field :location, :string
    field :delete, :boolean, virtual: true

    belongs_to :company, Nexpo.Company
    has_one :student_session, Nexpo.StudentSession, on_delete: :delete_all

    timestamps()

  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:start, :end, :location, :company_id])
    |> validate_required([:start, :end, :location, :company_id])
  end

  @doc """
  Builds an update changeset based on `company_id` and `params`
  """
  def update_changeset(%TimeSlot{company_id: nil}, params, company) do
    company
    |> Ecto.build_assoc(:student_session_time_slots)
    |> cast(params, [:start, :end, :location, :company_id, :delete])
    |> validate_required([:start, :end, :location, :company_id])
  end

  @doc """
  Builds an update changeset based on `company_id` and `params`
  """
  def update_changeset(%TimeSlot{} = time_slot, params, _company) do
    time_slot
    |> cast(params, [:start, :end, :location, :company_id, :delete])
    |> validate_required([:start, :end, :location, :company_id])
    |> mark_for_delete()
  end

  defp mark_for_delete(changeset) do
    if get_change(changeset, :delete) do
      %{ changeset | action: :delete }
    else
      changeset
    end
  end

  def get_available(company) do
    Repo.all(
      from slot in Ecto.assoc(company, :student_session_time_slots),
      left_join: session in assoc(slot, :student_session),
      where: is_nil(session.id))
  end

  def get_available_and_non_confirmed() do
    Repo.all(
      from slot in TimeSlot,
      left_join: session in assoc(slot, :student_session),
      where: is_nil(session.id) or session.student_confirmed != true)
  end

  def is_available?(student, time_slot) do
    Repo.one(
      from session in Ecto.assoc(student, :student_sessions),
      # Check that student does not already have session at the time of the given time slot
      left_join: slot in TimeSlot,
      on: slot.id == session.student_session_time_slot_id and
          slot.start == ^time_slot.start and slot.end == ^time_slot.end,
      where: not is_nil(slot.id),
      limit: 1,
      select: slot)
    |> is_nil()
  end
end
