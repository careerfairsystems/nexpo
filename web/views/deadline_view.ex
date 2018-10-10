defmodule Nexpo.DeadlineView do
  use Nexpo.Web, :view

  def render("index.json", %{deadlines: deadlines}) do
    %{data: render_many(deadlines, Nexpo.DeadlineView, "deadline.json")}
  end

  def render("show.json", %{deadline: deadline}) do
    %{data: render_one(deadline, Nexpo.DeadlineView, "deadline.json")}
  end

  def render("deadline.json", %{deadline: deadline}) do
    %{id: deadline.id,
      name: deadline.name,
      start: deadline.start,
      end: deadline.end}
  end
end
