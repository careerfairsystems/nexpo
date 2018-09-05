defmodule Nexpo.RoleView do
  use Nexpo.Web, :view

  def render("index.json", %{roles: roles}) do
    %{data: render_many(roles, Nexpo.RoleView, "role.json")}
  end

  def render("show.json", %{role: role}) do
    %{data: render_one(role, Nexpo.RoleView, "role.json")}
  end

  def render("role.json", %{role: role}) do
    %{id: role.id,
      type: role.type}
  end
end
