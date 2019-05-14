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

  def get_reps(conn, %{"company_id" => _company_id}, _user, _claims) do
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

  @apidoc """
  @api {GET} /me/reviews
  @apiGroup companies
  @apiDescription Gets basic information about all reviews a user has made
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

  def list_companies(conn, %{"company_id" => _company_id}, _user, _claims) do
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

  # get("/me/reviews/", MockController, :list_companies)
  # get("/me/reviews/:company_id", MockController, :get_company)
  # post("/me/reviews/:company_id", MockController, :review_company)
  @apidoc
end
