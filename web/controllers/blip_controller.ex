defmodule Nexpo.BlipController do
  use Nexpo.Web, :controller
  # I denna version av phoenix lägger denna raden till User och "claims" till varje request
  use Guardian.Phoenix.Controller
  import Ecto.Query
  alias Nexpo.Blip

  @apidoc """
  @api {GET} /api/me/company/blips List blips
  @apiGroup Blips
  @apiDescription List all students that have blipd by your booth
  @apiSuccessExample {json} Success

  HTTP 200 OK
  {
    "data": [
        {
            "year": null,
            "student_id": 2,
            "resume_sv_url": null,
            "resume_en_url": null,
            "rating": null,
            "programme": null,
            "last_name": "McTest",
            "inserted_at": "2019-09-15T14:55:43.860556",
            "first_name": "Test",
            "email": "test@it",
            "comment": null
        }
    ]
  }

  @apiUse NotFoundError
  @apiUse BadRequestError
  """
  def index(conn, _params, user, _claims) do
    company_id =
      user
      |> Repo.preload(:representative)
      |> Map.get(:representative)
      |> Map.get(:company_id)

    blips =
      from(b in Blip,
        where: b.company_id == ^company_id
      )
      |> Repo.all()
      |> Repo.preload([
        [student: [:interests, :user, :programme]]
      ])
      |> Enum.map(fn blip ->
        blip
        |> Map.merge(blip.student)
        |> Map.merge(blip.student.user)
        |> Map.put(:blipped_at, blip.inserted_at)
        |> Map.drop([:user])
      end)
      |> order_by(asc: :inserted_at)

    render(conn, "index.json", blips: blips)
  end

  @apidoc """
  @api {POST} /api/me/company/blips Create a blip for student
  @apiGroup Blips
  @apiDescription Create/ a comment of a student that has blipped your company

  @apiParam {Integer} student_id    Id of student blips
  @apiParam {Integer} rating    Optional, rating between 1 and five
  @apiParam {String}  comment   Optional, Your thoughts about the student
  @apiParamExample {json} Request-Example:
                 { "student_id": 1}

  @apiSuccessExample {json} Success
  HTTP 200 OK
  {
    "data": {
        "student_id": 3,
        "rating": null,
        "id": 24,
        "company_id": 2,
        "comment": null
    }
  }

  @apiUse UnprocessableEntity
  @apiUse NotFoundError
  @apiUse BadRequestError
  """
  def create(conn, blip_params, user, _claims) do
    user
    |> Repo.preload(:representative)
    |> Map.get(:representative)
    |> case do
      %{company_id: company_id} ->
        blip_params = Map.put(blip_params, "company_id", company_id)

        %Blip{}
        |> Blip.changeset(blip_params)
        |> Repo.insert()
        |> case do
          {:ok, blip} ->
            blip = Repo.preload(blip, [:student, :company])

            conn
            |> put_status(:created)
            |> render("show.json", blip: blip)

          {:error, changeset} ->
            conn
            |> put_status(:unprocessable_entity)
            |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
        end

      nil ->
        send_resp(conn, :forbidden, "")
    end
  end

  @apidoc """
  @api {GET} /api/me/company/blips/:student_id Student Info & blip data
  @apiGroup Blips
  @apiDescription Gets information about a student and your comments about them
  @apiSuccessExample {json} Success

  HTTP 200 OK
  {
    "student_id": 1,
    "student": {
        "year": null,
        "user_id": 1,
        "user": {
            "phone_number": "0707112233",
            "last_name": "Dev",
            "id": 1,
            "food_preferences": "cake",
            "first_name": "Dev",
            "email": "dev@it"
        },
        "resume_sv_url": null,
        "resume_en_url": null,
        "programme": null,
        "id": 1
    },
    "rating": 5,
    "inserted_at": "2019-09-19T17:08:45.126611",
    "comment": "Actually we do need birds"
  }

  @apiUse NotFoundError
  @apiUse BadRequestError
  """
  def show(conn, %{"id" => student_id}, user, _claims) do
    user
    |> get_blip(student_id)
    |> Repo.preload([
      [student: [:interests, :user, :programme]]
    ])
    |> case do
      blip = %{} ->
        blip =
          blip
          |> Map.merge(blip.student)
          |> Map.merge(blip.student.user)
          |> Map.put(:blipped_at, blip.inserted_at)
          |> Map.drop([:user])

        render(conn, "student.json", blip: blip)

      nil ->
        send_resp(conn, :not_found, "")
    end
  end

  @apidoc """
  @api {PATCH} /api/me/company/blips/:student_id Update blip info
  @apiGroup Blips
  @apiDescription Update a comment of a student that has blipped your company
  @apiParam {Integer} student_id    The id of the student
  @apiSuccessExample {json} Success

  HTTP 200 OK
  {
    "data": {
        "student_id": 3,
        "rating": null,
        "id": 24,
        "company_id": 2,
        "comment": null
    }
  }

  @apiUse NotFoundError
  @apiUse BadRequestError
  """
  def update(conn, %{"id" => student_id} = blip_params, user, _claims) do
    user
    |> get_blip(student_id)
    |> Blip.changeset(blip_params)
    |> Repo.update()
    |> case do
      {:ok, blip} ->
        render(conn, "show.json", blip: blip)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Nexpo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  @apidoc """
  @api {DELETE} /api/me/company/blips/:student_id Unblip - Delete a blip
  @apiGroup Blips
  @apiDescription Delete comment, rating and the blip itself from a student who blipped your company
  @apiParam {Integer} student_id    The id of the student
  @apiSuccessExample {json} Success
  HTTP 200 OK
  (empty resp)

  @apiUse NotFoundError
  @apiUse BadRequestError
  """
  def delete(conn, %{"id" => student_id}, user, _claims) do
    user
    |> get_blip(student_id)
    |> Repo.delete!()

    send_resp(conn, :no_content, "")
  end

  defp company_id(user) do
    user
    |> Repo.preload(:representative)
    |> Map.get(:representative)
    |> Map.get(:company_id)
  end

  defp get_blip(user, student_id) do
    company_id = company_id(user)

    from(b in Blip,
      where: b.company_id == ^company_id and b.student_id == ^student_id
    )
    |> Repo.one()
  end

  @apidoc
end
