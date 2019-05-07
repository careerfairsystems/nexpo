defmodule Nexpo.MockController do
  use Nexpo.Web, :controller
  use Guardian.Phoenix.Controller

  def list(conn, _params, _user, _claims) do
    json(conn, %{"yas" => "gg"})
  end

  @apidoc """
  @api {POST} /password/new/:key Reset forgotten password
  @apiGroup Forgot password

  @apiParam {String}  key                   Key representing this password reset
  @apiParam {String}  password              New password
  @apiParam {String}  password_confirmation Confirmation of password

  @apiSuccessExample {json} Success
    HTTP 200 OK
    {
      "type": "message",
      "data": "Successfully changed password"
    }

  @apiUse NotFoundError
  @apiUse BadRequestError
  """

  @apidoc
end
