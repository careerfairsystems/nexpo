defmodule Nexpo.ErrorView do
  use Nexpo.Web, :view

  @apidoc """
  @apiDefine BadRequestError
  @apiErrorExample {json} Bad Request
    HTTP 400 Bad Request
  """
  def render("400.json", _assigns) do
    generate_error("Bad Request")
  end

  @apidoc """
  @apiDefine UnauthorizedError
  @apiErrorExample {json} Unauthorized
    HTTP 401 Unauthorized
  """
  def render("401.json", _assigns) do
    generate_error("Unauthorized")
  end

  @apidoc """
  @apiDefine NotFoundError
  @apiErrorExample {json} Not Found
    HTTP 404 Not Found
  """
  def render("404.json", _assigns) do
    generate_error("Could not be found")
  end

  @apidoc """
  @apiDefine InternalServerError
  @apiErrorExample {json} Internal server error
    HTTP 500 Internal server error
  """
  def render("500.json", _assigns) do
    generate_error("Internal server error")
  end

  # In case no render clause matches or no
  # template is found, let's render it as 500
  def template_not_found(_template, _assigns) do
    render "500.json"
  end

  defp generate_error(message) do
    %{
      type: "error",
      error: message
    }
  end

  @apidoc

end
