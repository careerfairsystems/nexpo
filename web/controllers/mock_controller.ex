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
      "email": "lisa@hotmail.com
    "}]
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
  @api {GET} /api/me/company/blips List blips
  @apiGroup Comment
  @apiDescription List all students that have blipd by your booth
  @apiSuccessExample {json} Success

  HTTP 200 OK
  {
    "data": [{
      "first_name": "Lisa",
      "last_name": "Svensson",
      "id": 32,
      "blipped_at":"2019-04-16 13:50:16.300827",
      "has_comment": true
      "rating": 5
      "profile_picture_url": null
  }, {
      "first_name": "Kalle",
      "last_name": "Abrahamsson",
      "id": 28,
      "blipped_at":  "2019-04-15 13:50:16.300827",
      "has_comment":  false,
      "rating": 2,
      "profile_picture_url": null
  }]}
  }

  @apiUse NotFoundError
  @apiUse BadRequestError
  """
  def get_blips(conn, _params, _user, _claims) do
    json(conn, %{
      "data" => [
        %{
          "first_name" => "Lisa",
          "last_name" => "Svensson",
          "id" => 32,
          "blipped_at" => "2019-04-16 13:50:16.300827",
          "has_comment" => true,
          "rating" => 5,
          "profile_picture_url" => nil
        },
        %{
          "first_name" => "Kalle",
          "last_name" => "Abrahamsson",
          "id" => 28,
          "blipped_at" => "2019-04-15 13:50:16.300827",
          "has_comment" => false,
          "rating" => 2,
          "profile_picture_url" => nil
        }
      ]
    })
  end

  @apidoc """
  @api {GET} /api/me/company/comment/:student_id Student Info & Comment
  @apiGroup Comment
  @apiDescription Gets information about a student and your comments about them
  @apiSuccessExample {json} Success

  HTTP 200 OK
  {
    "data": {
      "first_name": "Lisa",
      "last_name": "Svensson",
      "phone_number": "555123456",
      "email": "lisa@hotmail.com",
      "id": 32,
      "year": 7,
      "resume_sv_url":"www.google.se",
      "resume_en_url":"www.google.com",
      "programme":"C",
      "blipped_at":"2019-04-16 13:50:16.300827",
      "comment": "wow what a student A+\n",
      "commented_by": "Kajsa Johansson",
      "rating": 5,
      "profile_picture_url": null
    }
  }

  @apiUse NotFoundError
  @apiUse BadRequestError
  """
  def get_student_comment(conn, %{"student_id" => _student_id}, _user, _claims) do
    json(conn, %{
      "data" => %{
        "first_name" => "Lisa",
        "last_name" => "Svensson",
        "phone_number" => "555123456",
        "email" => "lisa@hotmail.com",
        "id" => 32,
        "year" => 7,
        "resume_sv_url" => "www.google.se",
        "resume_en_url" => "www.google.com",
        "programme" => "C",
        "blipped_at" => "2019-04-16 13:50:16.300827",
        "has_comment" => true,
        "rating" => 5,
        "commented_by" => "Kajsa johansson",
        "profile_picture_url" => nil
      }
    })
  end

  @apidoc """
  @api {POST} /api/me/company/comments/:student_id Comment a student
  @apiGroup Comment
  @apiDescription Create/Update a comment of a student that has blipped your company

  @apiParam {Integer} rating    A rating between 1 and five
  @apiParam {String}  comment   Your thoughts about the student
  @apiParamExample {json} Request-Example:
                 { "rating": 1, "comment": "Student was actually a bird"}

  @apiUse UnprocessableEntity 
  @apiUse NotFoundError
  @apiUse BadRequestError
  """
  def comment_student(
        conn,
        %{"student_id" => _student_id, "rating" => _rating, "comment" => _comment},
        _user,
        _claims
      ) do
    json(conn, "nice")
  end

  def comment_student(conn, _params, _user, _claims) do
    json(Plug.Conn.put_status(conn, 422), "stuff is missing yo")
  end

  @apidoc
end
