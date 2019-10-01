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

  @apidoc """
  @api {Patch} /api/me/company/blips/:student_id
  @apiGroup Blips
  @apiDescription Update a comment of a student that has blipped your company

  @apiParam {Integer} student_id    The id of the user
  @apiParamExample {json} Request-Example:
                 { "student_id": 1 }

  @apiUse UnprocessableEntity
  @apiUse NotFoundError
  @apiUse BadRequestError
  """
  def do_blip(
        conn,
        %{"student_id" => _student_id},
        _user,
        _claims
      ) do
    json(conn, "nice")
  end

  def do_blip(conn, _params, _user, _claims) do
    json(Plug.Conn.put_status(conn, 422), "stuff is missing yo")
  end

  @apidoc """
  @api {POST} /api/me/company/blips
  @apiGroup Blips
  @apiDescription Create/Update a comment of a student that has blipped your company

  @apiParam {Integer} student_id    The id of the user
  @apiParamExample {json} Request-Example:
                 { "student_id": 1 }

  @apiUse UnprocessableEntity
  @apiUse NotFoundError
  @apiUse BadRequestError
  """
  def remove_blip(
        conn,
        %{"student_id" => _student_id},
        _user,
        _claims
      ) do
    json(conn, "nice")
  end
end
