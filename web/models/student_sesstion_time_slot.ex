defmodule Nexpo.StudentSessionTimeSlots do
  use Nexpo.Web, :model

  schema "student_session_time_slots" do
    field :start, :naive_datetime
    field :end, :naive_datetime
    field :used, :boolean

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:start, :end, :used])
    |> validate_required([:start, :end, :used])
  end
end
