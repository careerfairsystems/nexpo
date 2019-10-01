defmodule Nexpo.MockController do
  use Nexpo.Web, :controller
  use Guardian.Phoenix.Controller

  @apidoc """
  @api {GET} /api/me/company/representatives List company representatives
  @apiGroup Company
  @apiDescription Gets contact information for the student hosts for the company a the user is associated with
  @apiSuccessExample {json} Success

  HTTP 200 OK
  {
    "data": [{
      "first_name": "Lisa",
      "last_name": "Svensson",
      "phone_number": "555123456",
      "email": "lisa@hotmail.com"
    }]
  }

  @apiUse NotFoundError
  @apiUse BadRequestError
  """

  def get_reps(conn, _params, _user, _claims) do
    json(conn, %{
      "data" => [
        %{
          "first_name" => "Lisa",
          "last_name" => "Svensson",
          "phone_number" => "555123456",
          "email" => "lisa@hotmail.com"
        }
      ]
    })
  end
end
