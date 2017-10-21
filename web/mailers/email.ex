defmodule Nexpo.Email do
  import Bamboo.Email
  use Bamboo.Phoenix, view: Nexpo.EmailView

  def pre_signup_email(user) do
    base_email()
    |> to(user.email)
    |> subject("Proceed with signup")
    |> render("pre_signup.html", user: user)
  end

  def completed_sign_up_mail(user) do
    base_email()
    |> to(user.email)
    |> subject("Welcome to Nexpo!")
    |> render("completed_signup.html")
  end

  defp base_email do
    new_email()
    |> from("nexpo@arkad.se")
  end
end
