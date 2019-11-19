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
  first_name: "Admin",
  last_name: "Developer",
  phone_number: "0707112233",
  food_preferences: "",
  hashed_password: Comeonin.Bcrypt.hashpwsalt("password")
})

Repo.insert!(%User{
  email: "student1@test",
  first_name: "Alfa",
  last_name: "Student",
  phone_number: "0708334455",
  food_preferences: "",
  hashed_password: Comeonin.Bcrypt.hashpwsalt("password")
})

Repo.insert!(%User{
  email: "student2@test",
  first_name: "Bravo",
  last_name: "Student",
  phone_number: "0708334455",
  food_preferences: "",
  hashed_password: Comeonin.Bcrypt.hashpwsalt("password")
})

Repo.insert!(%User{
  email: "student3@test",
  first_name: "Charlie",
  last_name: "Student",
  phone_number: "0708334455",
  food_preferences: "",
  hashed_password: Comeonin.Bcrypt.hashpwsalt("password")
})

Repo.insert!(%User{
  email: "company1@test",
  first_name: "Alfa",
  last_name: "Company",
  phone_number: "555123456",
  food_preferences: "",
  hashed_password: Comeonin.Bcrypt.hashpwsalt("password")
})

Repo.insert!(%User{
  email: "company2@test",
  first_name: "Bravo",
  last_name: "Company",
  phone_number: "555123456",
  food_preferences: "",
  hashed_password: Comeonin.Bcrypt.hashpwsalt("password")
})

Repo.insert!(%User{
  email: "company3@test",
  first_name: "Charlie",
  last_name: "Company",
  phone_number: "555123456",
  food_preferences: "",
  hashed_password: Comeonin.Bcrypt.hashpwsalt("password")
})

Repo.insert!(%User{
  email: "company4@test",
  first_name: "Delta",
  last_name: "Company",
  phone_number: "555123456",
  food_preferences: "",
  hashed_password: Comeonin.Bcrypt.hashpwsalt("password")
})

Repo.insert!(%User{
  email: "company5@test",
  first_name: "Echo",
  last_name: "Company",
  phone_number: "555123456",
  food_preferences: "",
  hashed_password: Comeonin.Bcrypt.hashpwsalt("password")
})

admin_user = Repo.get_by(User, %{email: "admin@test"}) |> Repo.preload([:roles, :student])
student_user1 = Repo.get_by(User, %{email: "student1@test"}) |> Repo.preload([:roles, :student])
student_user2 = Repo.get_by(User, %{email: "student2@test"}) |> Repo.preload([:roles, :student])
student_user3 = Repo.get_by(User, %{email: "student3@test"}) |> Repo.preload([:roles, :student])
company_user1 = Repo.get_by(User, %{email: "company1@test"}) |> Repo.preload([:representative])
company_user2 = Repo.get_by(User, %{email: "company2@test"}) |> Repo.preload([:representative])
company_user3 = Repo.get_by(User, %{email: "company3@test"}) |> Repo.preload([:representative])
company_user4 = Repo.get_by(User, %{email: "company4@test"}) |> Repo.preload([:representative])
company_user5 = Repo.get_by(User, %{email: "company5@test"}) |> Repo.preload([:representative])

# Create some roles
alias Nexpo.Role
admin_role = Repo.insert!(%Role{type: "admin", permissions: ["read_all", "write_all"]})

# OBS! meant for business manager in project group
company_role =
  Repo.insert!(%Role{type: "company", permissions: ["read_company", "write_company"]})

# Associate roles with users
User.changeset(admin_user)
|> Ecto.Changeset.put_assoc(:roles, [admin_role])
|> Nexpo.Repo.update!()

# Associate students with users
alias Nexpo.Student
Student.build_assoc!(student_user1)
Student.build_assoc!(student_user2)
Student.build_assoc!(student_user3)

# Create some companies
alias Nexpo.Company

Repo.insert!(%Company{
  name: "Google",
  description: "We code!",
  website: "www.google.com",
  student_session_days: 1
})

Repo.insert!(%Company{
  name: "Spotify",
  description: "We do music!",
  website: "www.spotify.com",
  student_session_days: 2
})

Repo.insert!(%Company{
  name: "Intel",
  description: "We do stuff!",
  website: "www.intel.com",
  student_session_days: 3
})

Repo.insert!(%Company{
  name: "IBM",
  description: "We make things, especially electronics!",
  website: "www.ibm.com"
})

Repo.insert!(%Company{
  name: "Jesus wine makers",
  description: "We do wine!",
  website: "www.jesus.com"
})

# Associate representatives with users
alias Nexpo.Representative
Representative.build_assoc!(company_user1, 1)
Representative.build_assoc!(company_user2, 2)
Representative.build_assoc!(company_user3, 3)
Representative.build_assoc!(company_user4, 4)
Representative.build_assoc!(company_user5, 4)

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

# Company 1
Repo.insert(%StudentSessionTimeSlot{
  start: ~N[2000-01-01 08:00:00],
  end: ~N[2000-01-01 08:15:00],
  location: "Albatraoz",
  company_id: 1
})

Repo.insert(%StudentSessionTimeSlot{
  start: ~N[2000-01-01 08:15:00],
  end: ~N[2000-01-01 08:30:00],
  location: "Bjerhammar",
  company_id: 1
})

# Company 2
Repo.insert(%StudentSessionTimeSlot{
  start: ~N[2000-01-01 08:00:00],
  end: ~N[2000-01-01 08:15:00],
  location: "Albatraoz",
  company_id: 2
})

Repo.insert(%StudentSessionTimeSlot{
  start: ~N[2000-01-01 08:15:00],
  end: ~N[2000-01-01 08:30:00],
  location: "Bjerhammar",
  company_id: 2
})

# Company 3
Repo.insert(%StudentSessionTimeSlot{
  start: ~N[2000-01-01 08:00:00],
  end: ~N[2000-01-01 08:15:00],
  location: "Albatraoz",
  company_id: 3
})

Repo.insert(%StudentSessionTimeSlot{
  start: ~N[2000-01-01 08:15:00],
  end: ~N[2000-01-01 08:30:00],
  location: "Bjerhammar",
  company_id: 3
})

# Create some student-session applications
alias Nexpo.StudentSessionApplication

# Student 1
Repo.insert!(%StudentSessionApplication{
  motivation: "",
  student_id: 1,
  company_id: 1,
  score: 5
})

Repo.insert!(%StudentSessionApplication{
  motivation: "",
  student_id: 1,
  company_id: 2,
  score: 4
})

Repo.insert!(%StudentSessionApplication{
  motivation: "",
  student_id: 1,
  company_id: 3,
  score: 5
})

# Student 2
Repo.insert!(%StudentSessionApplication{
  motivation: "",
  student_id: 2,
  company_id: 1,
  score: 2
})

Repo.insert!(%StudentSessionApplication{
  motivation: "",
  student_id: 2,
  company_id: 2,
  score: 5
})

Repo.insert!(%StudentSessionApplication{
  motivation: "",
  student_id: 2,
  company_id: 3,
  score: 1
})

# Student 3
Repo.insert!(%StudentSessionApplication{
  motivation: "",
  student_id: 3,
  company_id: 1,
  score: 2
})

Repo.insert!(%StudentSessionApplication{
  motivation: "",
  student_id: 3,
  company_id: 2,
  score: 3
})

Repo.insert!(%StudentSessionApplication{
  motivation: "",
  student_id: 3,
  company_id: 3,
  score: 4
})

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

# Create some blips

alias Nexpo.Blip

Repo.insert(%Blip{comment: "Cool boi", rating: 3, company_id: 1, student_id: 1})
Repo.insert(%Blip{comment: "Cool gril", rating: 1, company_id: 1, student_id: 2})
Repo.insert(%Blip{comment: "who dis?", rating: 4, company_id: 1, student_id: 3})
