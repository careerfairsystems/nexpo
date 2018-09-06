defmodule Nexpo.RoleView do
  use Nexpo.Web, :view

  def render("index.json", %{roles: roles}) do
    %{data: render_many(roles, Nexpo.RoleView, "role.json")}
  end

  def render("show.json", %{role: role}) do
    %{data: render_one(role, Nexpo.RoleView, "role.json")}
  end

  def render("role.json", %{role: role}) do
    data = %{id: role.id,
      type: role.type}

    if Ecto.assoc_loaded?(role.users) do
      users = render_many(role.users, Nexpo.User, "user.json")
      Map.put(data, :users, users)
    else
      data
    end
  end
end
