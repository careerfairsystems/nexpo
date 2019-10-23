# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Nexpo.Repo.insert!(%Nexpo.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
defmodule SeedEntries do
  def seed(_, _, n) when n <= 0 do
  end

  def seed(repo, entry_type, n) do
    alias Nexpo.CompanyEntry
    alias Nexpo.Repo

    Repo.insert!(%CompanyEntry{
      value: "#{:rand.uniform(100)}",
      company_id: :rand.uniform(5),
      category_attribute_id: :rand.uniform(16)
    })

    seed(repo, entry_type, n - 1)
  end
end

alias Nexpo.Repo

# Create some users
alias Nexpo.User

Repo.insert!(%User{
  email: "admin@test",
  first_name: "Dev",
  last_name: "Dev",
  phone_number: "0707112233",
  food_preferences: "cake",
  hashed_password: Comeonin.Bcrypt.hashpwsalt("password")
})

Repo.insert!(%User{
  email: "student@test",
  first_name: "Test",
  last_name: "McTest",
  phone_number: "13371337",
  food_preferences: "Cookies",
  hashed_password: Comeonin.Bcrypt.hashpwsalt("password")
})

Repo.insert!(%User{
  email: "company@test",
  first_name: "Mr.",
  last_name: "Google",
  phone_number: "555123456",
  food_preferences: "User data only!",
  hashed_password: Comeonin.Bcrypt.hashpwsalt("password")
})

admin_user = Repo.get_by(User, %{email: "admin@test"}) |> Repo.preload([:roles, :student])
student_user = Repo.get_by(User, %{email: "student@test"}) |> Repo.preload([:roles, :student])
company_user = Repo.get_by(User, %{email: "company@test"}) |> Repo.preload([:representative])

# Create some roles
alias Nexpo.Role
admin_role = Repo.insert!(%Role{type: "admin", permissions: ["read_all", "write_all"]})
pleb_role = Repo.insert!(%Role{type: "pleb", permissions: []})

# Associate roles with users
User.changeset(admin_user)
|> Ecto.Changeset.put_assoc(:roles, [admin_role])
|> Nexpo.Repo.update!()

User.changeset(student_user)
|> Ecto.Changeset.put_assoc(:roles, [pleb_role])
|> Nexpo.Repo.update!()

# Associate students with users
alias Nexpo.Student
Student.build_assoc!(admin_user)
Student.build_assoc!(student_user)

# Create some companies
alias Nexpo.Company

Repo.insert!(%Company{
  name: "Spotify",
  description: "We do music!",
  website: "www.spotify.com",
  student_session_days: 1
})

Repo.insert!(%Company{
  name: "Google",
  description: "We code!",
  website: "www.google.com",
  student_session_days: 2
})

Repo.insert!(%Company{name: "IBM", description: "We make things!", website: "www.ibm.com"})

Repo.insert!(%Company{
  name: "Intel",
  description: "We do stuff!",
  website: "www.intel.com",
  student_session_days: 3
})

Repo.insert!(%Company{
  name: "Jesus wine makers",
  description: "We do wine!",
  website: "www.jesus.com"
})

google = Repo.get_by!(Company, %{name: "Google"})

# Associate representatives with users
alias Nexpo.Representative
Representative.build_assoc!(company_user, google.id)

# Create some Categories
alias Nexpo.Category
Repo.insert!(%Category{title: "Logistik"})
Repo.insert!(%Category{title: "Avtal"})
Repo.insert!(%Category{title: "Övrigt"})
Repo.insert!(%Category{title: "Event"})

# Create some Category attributes
alias Nexpo.CategoryAttribute
Repo.insert!(%CategoryAttribute{title: "Eluttag", category_id: 1})
Repo.insert!(%CategoryAttribute{title: "Internetkoder", category_id: 1})
Repo.insert!(%CategoryAttribute{title: "Ståbord", category_id: 1})
Repo.insert!(%CategoryAttribute{title: "Koli", category_id: 1})

Repo.insert!(%CategoryAttribute{title: "Beskrivning", category_id: 2})
Repo.insert!(%CategoryAttribute{title: "Länk till document", category_id: 2})
Repo.insert!(%CategoryAttribute{title: "Ansvarig", category_id: 2})
Repo.insert!(%CategoryAttribute{title: "Kontakt Uppgifter", category_id: 2})

Repo.insert!(%CategoryAttribute{title: "Udda beställning", category_id: 3})
Repo.insert!(%CategoryAttribute{title: "Extra ketchup", category_id: 3})
Repo.insert!(%CategoryAttribute{title: "Trevligthetsskala", category_id: 3})
Repo.insert!(%CategoryAttribute{title: "Länk till podio", category_id: 3})

Repo.insert!(%CategoryAttribute{title: "Lunchföreläsning", category_id: 4})
Repo.insert!(%CategoryAttribute{title: "Pub", category_id: 4})
Repo.insert!(%CategoryAttribute{title: "Yrkesvaskning", category_id: 4})
Repo.insert!(%CategoryAttribute{title: "Sabrering för nybörjare", category_id: 4})
Repo.insert!(%CategoryAttribute{title: "Sabrering för nybörjare", category_id: 4})

# Create some random company entries
alias Nexpo.CompanyEntry
SeedEntries.seed(Repo, CompanyEntry, 100)

# Create some student-session time slots
alias Nexpo.StudentSessionTimeSlot

Repo.insert(%StudentSessionTimeSlot{
  start: ~N[2000-01-01 08:00:00],
  end: ~N[2000-01-01 08:15:00],
  location: "Albatraoz",
  company_id: 1
})

Repo.insert(%StudentSessionTimeSlot{
  start: ~N[2000-01-01 08:15:00],
  end: ~N[2000-01-01 08:30:00],
  location: "Albatraoz",
  company_id: 2
})

Repo.insert(%StudentSessionTimeSlot{
  start: ~N[2000-01-01 08:30:00],
  end: ~N[2000-01-01 08:45:00],
  location: "Bjerhammar",
  company_id: 2
})

Repo.insert(%StudentSessionTimeSlot{
  start: ~N[2000-01-01 08:45:00],
  end: ~N[2000-01-01 09:00:00],
  location: "Chalmers",
  company_id: 2
})

# Create some student-session applications
alias Nexpo.StudentSessionApplication

Repo.insert!(%StudentSessionApplication{
  motivation: "Im really good",
  company_id: 1,
  student_id: 2,
  score: 1
})

Repo.insert!(%StudentSessionApplication{
  motivation: "I love Google!",
  company_id: 2,
  student_id: 1,
  score: 1
})

Repo.insert!(%StudentSessionApplication{
  motivation: "Im awesome good",
  company_id: 2,
  student_id: 2,
  score: 3
})

Repo.insert!(%StudentSessionApplication{
  motivation: "Im awesome really good",
  company_id: 4,
  student_id: 2,
  score: 3
})

# Create som student sessions
# alias Nexpo.StudentSession
# Repo.insert!(%StudentSession{student_id: 2, student_session_time_slot_id: 1})
# Repo.insert!(%StudentSession{student_id: 1, student_session_time_slot_id: 2})
# Repo.insert!(%StudentSession{student_id: 2, student_session_time_slot_id: 3})

# Create some mailtemplates
alias Nexpo.Mailtemplate

Repo.insert!(%Mailtemplate{
  name: "Pre Signup",
  subject: "Nexpo | Verify your email!",
  content: "<h1>Welcome!</h1><a href=<%= signup_url(@user) %>>link</a>",
  signature: ""
})

Repo.insert!(%Mailtemplate{
  name: "Completed Signup",
  subject: "Nexpo | Welcome to ARKAD!",
  content: "<h1>Welcome!</h1><a href=<%= application_url() %>>login</a>",
  signature: ""
})

Repo.insert!(%Mailtemplate{
  name: "Reset Password",
  subject: "Nexpo | Reset password!",
  content: "<h1>Reset Password!</h1><a href=<%= reset_password_url(@user) %>>Reset</a>",
  signature: ""
})

Repo.insert!(%Mailtemplate{
  name: "Hosts Welcome",
  subject: "ARKAD | Welcome Hosts!",
  content: "<h1>Welcome <%= @user.first_name %></h1>",
  signature: "Best Regards\nhosts.arkad@tlth.se"
})

# Create some deadlines
alias Nexpo.Deadline

Repo.insert!(%Deadline{
  name: "Host Applications",
  start: ~N[2000-01-01 23:00:00],
  end: ~N[2040-01-01 23:00:00]
})

Repo.insert!(%Deadline{
  name: "Company Registration",
  start: ~N[2040-01-01 08:00:00],
  end: ~N[2060-01-01 23:59:00]
})

Repo.insert!(%Deadline{
  name: "Gasque Reservations",
  start: ~N[2010-11-14 08:00:07],
  end: ~N[2040-01-01 10:00:00]
})

# Create some programmes
alias Nexpo.Programme
Repo.insert!(%Programme{name: "F-Guild", code: "F"})
Repo.insert!(%Programme{name: "E-Guild", code: "E"})
Repo.insert!(%Programme{name: "M-Guild", code: "M"})
Repo.insert!(%Programme{name: "V-Guild", code: "V"})
Repo.insert!(%Programme{name: "A-Guild", code: "A"})
Repo.insert!(%Programme{name: "K-Guild", code: "K"})
Repo.insert!(%Programme{name: "D-Guild", code: "D"})

# Create the interests

alias Nexpo.Interest
Repo.insert(%Interest{id: 1, name: "Foreign Opportunity"})
Repo.insert(%Interest{id: 2, name: "Internship"})
Repo.insert(%Interest{id: 3, name: "Part-time job"})
Repo.insert(%Interest{id: 4, name: "Summer job"})
Repo.insert(%Interest{id: 5, name: "Thesis"})
Repo.insert(%Interest{id: 6, name: "Trainee employment"})
Repo.insert(%Interest{id: 7, name: "Full-time job"})
