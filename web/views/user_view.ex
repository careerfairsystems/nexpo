defmodule Nexpo.UserView do
  use Nexpo.Web, :view

  def render("index.json", %{users: users}) do
    %{data: render_many(users, Nexpo.UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, Nexpo.UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    # Define own parameters to keep
    base = [:id, :email, :firstName, :lastName]

    Nexpo.Support.View.render_object(user, base)
  end

end
