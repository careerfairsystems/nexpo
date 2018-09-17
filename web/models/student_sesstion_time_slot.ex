defmodule Nexpo.StudentSessionTimeSlots do
  use Nexpo.Web, :model

  schema "student_session_time_slots" do
    field :start, :datetime
    field :end, :datetime
    field :used, :boolean

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:code, :name])
    |> validate_required([:code, :name])
  end
end
