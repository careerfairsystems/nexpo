defmodule Nexpo.MailtemplateView do
  use Nexpo.Web, :view

  def render("index.json", %{mailtemplates: mailtemplates}) do
    %{data: render_many(mailtemplates, Nexpo.MailtemplateView, "mailtemplate.json")}
  end

  def render("show.json", %{mailtemplate: mailtemplate}) do
    %{data: render_one(mailtemplate, Nexpo.MailtemplateView, "mailtemplate.json")}
  end

  def render("mailtemplate.json", %{mailtemplate: mailtemplate}) do
    %{
      id: mailtemplate.id,
      name: mailtemplate.name,
      subject: mailtemplate.subject,
      content: mailtemplate.content,
      signature: mailtemplate.signature
    }
  end
end
