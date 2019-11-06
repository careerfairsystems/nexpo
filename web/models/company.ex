defmodule Nexpo.Company do
  use Nexpo.Web, :model
  use Arc.Ecto.Schema

  alias Nexpo.Repo
  alias Nexpo.Company
  alias Nexpo.StudentSessionTimeSlot, as: TimeSlot

  schema "companies" do
    field(:name, :string)
    field(:logo_url, Nexpo.CompanyLogo.Type)
    field(:description, :string)
    field(:website, :string)
    field(:student_session_days, :integer, default: 0)
    field(:top_students, {:array, :map}, default: [], virtual: true)
    field(:host_name, :string)
    field(:host_mail, :string)
    field(:host_phone_number, :string)

    has_many(:entries, Nexpo.CompanyEntry, on_delete: :delete_all)
    has_many(:representatives, Nexpo.Representative)
    has_many(:desired_programmes, Nexpo.DesiredProgramme)
    has_many(:student_sessions, Nexpo.StudentSession)
    has_many(:student_session_applications, Nexpo.StudentSessionApplication)
    has_many(:student_session_time_slots, Nexpo.StudentSessionTimeSlot)

    many_to_many(:industries, Nexpo.Industry, join_through: "companies_industries")
    many_to_many(:job_offers, Nexpo.JobOffer, join_through: "companies_job_offers")
    many_to_many(:users, Nexpo.User, join_through: "representatives", on_replace: :delete)

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(%Company{} = company, params \\ %{}) do
    company
    |> cast(params, [:name, :description, :website, :student_session_days])
    |> cast(params, [:host_name, :host_mail, :host_phone_number])
    |> cast_attachments(params, [:logo_url])
    |> validate_required([:name, :description, :website])
    |> unique_constraint(:name)
    |> cast_assoc(:student_session_time_slots, with: &TimeSlot.update_changeset(&1, &2, company))
  end

  def representative_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:description, :website])
    |> cast_attachments(params, [:logo_url])
    |> validate_required([:name, :description, :website])
    |> unique_constraint(:name)
  end

  def put_assoc(changeset, params) do
    case Map.get(params, "company_ids") do
      nil ->
        changeset

      company_ids ->
        companies = get_assoc(company_ids)

        changeset
        |> Ecto.Changeset.put_assoc(:companies, companies)
    end
  end

  defp get_assoc(company_ids) do
    Repo.all(
      from(company in Company,
        where: company.id in ^company_ids
      )
    )
  end

  def get_available() do
    Repo.all(
      from(company in Company,
        where: company.student_session_days > 0
      )
    )
  end
end
