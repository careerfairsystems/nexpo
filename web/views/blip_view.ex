defmodule Nexpo.BlipView do
  use Nexpo.Web, :view

  def render("index.json", %{blips: blips}) do
    %{data: render_many(blips, Nexpo.BlipView, "blip.json")}
  end

  def render("show.json", %{blip: blip}) do
    %{data: render_one(blip, Nexpo.BlipView, "blip.json")}
  end

  def render("blip.json", %{blip: blip}) do
    %{
      id: blip.id,
      rating: blip.rating,
      comment: blip.comment,
      student_id: blip.student_id,
      company_id: blip.company_id
    }
  end

  def render("student.json", %{student: student}) do
    base = [
      :student_id,
      :email,
      :first_name,
      :last_name,
      :comment,
      :rating,
      :blip_time,
      :program
      # :cv_url,
      # :profile_pic_url
    ]

    Nexpo.Support.View.render_object(student, base)
  end
end
