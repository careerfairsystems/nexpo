defmodule Nexpo.RoleView do
  use Nexpo.Web, :view

  def render("index.json", %{roles: roles}) do
    %{data: render_many(roles, Nexpo.RoleView, "role.json")}
  end

  def render("show.json", %{role: role}) do
    %{data: render_one(role, Nexpo.RoleView, "role.json")}
  end

  def render("role.json", %{role: role}) do
    # Define own parameters to keep
    base = [:id, :type, :permissions]

    Nexpo.Support.View.render_object(role, base)
  end
end
