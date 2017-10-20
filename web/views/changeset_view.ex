defmodule Nexpo.ChangesetView do
  use Nexpo.Web, :view

  @doc """
  Traverses and translates changeset errors.

  See `Ecto.Changeset.traverse_errors/2` and
  `Nexpo.ErrorHelpers.translate_error/1` for more details.
  """
  def translate_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, &translate_error/1)
  end

  def render("error.json", %{changeset: changeset}) do
    # When encoded, the changeset returns its errors
    # as a JSON object. So we just pass it forward.
    %{errors: translate_errors(changeset)}
  end

  @apidoc """
  @apiDefine UnprocessableEntity

  @apiError (UnprocessableEntity 422) {Object} errors                        Object containing errors
  @apiError (UnprocessableEntity 422) {String[]} errors.[unprocessable-key]  Array of String error messages

  @apiErrorExample {json} UnprocessableEntity
  HTTP 422 Unprocessable Entity
  {
    "errors": {
      "title": [
        "can't be blank"
      ]
    }
  }
  """

end
