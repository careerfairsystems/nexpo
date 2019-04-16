defmodule Nexpo.Repo.Migrations.RenameStudentCvUrl do
  use Ecto.Migration

  def change do
    rename(table(:students), :resumeSvUrl, to: :resume_sv_url)
    rename(table(:students), :resumeEnUrl, to: :resume_en_url)
  end
end
