defmodule Nexpo.StudentSessionTimeSlotView do
  use Nexpo.Web, :view

  def render("index.json", %{student_session_time_slots: student_session_time_slots}) do
    %{data: render_many(student_session_time_slots, Nexpo.StudentSessionTimeSlotView, "student_session_time_slot.json")}
  end

  def render("show.json", %{student_session_time_slot: student_session_time_slot}) do
    %{data: render_one(student_session_time_slot, Nexpo.StudentSessionTimeSlotView, "student_session_time_slot.json")}
  end

  def render("student_session_time_slot.json", %{student_session_time_slot: student_session_time_slot}) do
    # Define own parameters to keep
    base = [:id, :start, :end, :location]

    Nexpo.Support.View.render_object(student_session_time_slot, base)
  end
end
