defmodule Nexpo.StudentSessionTimeSlot do
  use Nexpo.Web, :model

  schema "student_session_time_slots" do
    field :start, :naive_datetime
    field :end, :naive_datetime
    field :used, :boolean, default: false

    belongs_to :company, Nexpo.Company

    timestamps()

  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:start, :end, :used, :company_id])
    |> validate_required([:start, :end, :used, :company_id])
  end
end
