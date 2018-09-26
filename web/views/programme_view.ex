defmodule Nexpo.ProgrammeView do
  use Nexpo.Web, :view

  def render("index.json", %{programmes: programmes}) do
    %{data: render_many(programmes, Nexpo.ProgrammeView, "programme.json")}
  end

  def render("show.json", %{programme: programme}) do
    %{data: render_one(programme, Nexpo.ProgrammeView, "programme.json")}
  end

  def render("programme.json", %{programme: programme}) do
    # Define own parameters to keep
    base = [:id, :code, :name]

    Nexpo.Support.View.render_object(programme, base)
  end
end
