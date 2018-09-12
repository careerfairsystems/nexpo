defmodule Nexpo.ProgrammeView do
  use Nexpo.Web, :view

  def render("index.json", %{programmes: programmes}) do
    %{data: render_many(programmes, Nexpo.ProgrammeView, "programme.json")}
  end

  def render("show.json", %{programme: programme}) do
    %{data: render_one(programme, Nexpo.ProgrammeView, "programme.json")}
  end

  def render("programme.json", %{programme: programme}) do
    %{id: programme.id,
      code: programme.code,
      name: programme.name}
  end
end
