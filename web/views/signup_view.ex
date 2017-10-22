defmodule Nexpo.SignupView do
  use Nexpo.Web, :view

  def render("initial_signup.json", _data) do
    Nexpo.Support.View.render_object(%{}, [])
  end

end
