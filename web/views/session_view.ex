defmodule Nexpo.SessionView do
  use Nexpo.Web, :view

  def render("login.json", %{session: session}) do
    %{data: render_one(session, Nexpo.SessionView, "session.json")}
  end

  def render("session.json", %{session: session}) do
    base = [:jwt]

    Nexpo.Support.View.render_object(session, base)
  end
end
