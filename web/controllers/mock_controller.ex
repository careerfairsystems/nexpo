defmodule Nexpo.MockController do
  use Nexpo.Web, :controller
  use Guardian.Phoenix.Controller

  @apidoc """
  @api {GET} /me/representatives
  @apiGroup companies
  @apiDescription Gets the student representatives for the company the current user is associated with
  @apiSuccessExample {json} Success

  HTTP 200 OK
  {
  "data": [{
  "first_name": "Mr.",
  "last_name": "Google",
  "student": null,
  "roles": [],
  "id": 5,
  "food_preferences": "User data only!",
  "phone_number": "555123456",
  "email": "test@google"}]
  }

  @apiUse NotFoundError
  @apiUse BadRequestError
  """

  def get_reps(conn, %{"company_id" => company_id}, _user, _claims) do
    json(conn, %{
      "data" => [
        %{
          "first_name" => "Mr.",
          "last_name" => "Google",
          "student" => nil,
          "roles" => [],
          "id" => 5,
          "food_preferences" => "User data only!",
          "phone_number" => "555123456",
          "email" => "test@google"
        }
      ]
    })
  end
end
