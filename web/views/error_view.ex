defmodule Nexpo.ErrorView do
  use Nexpo.Web, :view

  @apidoc """
  @apiDefine NotFoundError
  @apiErrorExample {json} Not Found
    HTTP 404 Not Found
  """
  def render("404.html", _assigns) do
    "Page not found"
  end

  @apidoc """
  @apiDefine InternalServerError
  @apiErrorExample {json} Internal Server Error
    HTTP 500 Internal Server Error
  """
  def render("500.html", _assigns) do
    "Internal server error"
  end

  # In case no render clause matches or no
  # template is found, let's render it as 500
  def template_not_found(_template, assigns) do
    render "500.html", assigns
  end
end
