defmodule Nexpo.Email do
  import Bamboo.Email
  use Bamboo.Phoenix, view: Nexpo.EmailView

  def pre_signup_student_email(user) do
    base_email()
    |> to(user.email)
    |> subject("Nexpo | Verify your email")
    |> render("pre_signup_student.html", user: user)
  end

  def pre_signup_representative_email(user, company) do
    base_email()
    |> to(user.email)
    |> subject("Nexpo | Verify your email")
    |> render("pre_signup_representative.html", user: user, company: company)
  end

  def completed_sign_up_mail(user) do
    base_email()
    |> to(user.email)
    |> subject("Nexpo | Welcome!")
    |> render("completed_signup.html", user: user)
  end

  def reset_password(user) do
    base_email()
    |> to(user.email)
    |> subject("Nexpo | Reset password")
    |> render("reset_password.html", user: user)
  end

  defp base_email do
    new_email()
    |> from("no-reply@arkadtlth.se")
    |> put_html_layout({Nexpo.LayoutView, "email.html"})
  end
end
