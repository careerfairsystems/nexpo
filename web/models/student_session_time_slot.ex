defmodule Nexpo.StudentSessionTimeSlot do
  use Nexpo.Web, :model
  
  alias Nexpo.StudentSessionTimeSlot, as: TimeSlot

  schema "student_session_time_slots" do
    field :start, :naive_datetime
    field :end, :naive_datetime
    field :location, :string

    belongs_to :company, Nexpo.Company

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
     Ecto.build_assoc(company, :student_session_time_slots)
     |> cast(params, [:start, :end, :location, :company_id])
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

   @doc """
   Puts an delete action to the changeset
   """
   defp mark_for_delete(changeset) do
     if get_change(changeset, :delete) do
       %{ changeset | action: :delete }
     else
       changeset
     end
   end
end
