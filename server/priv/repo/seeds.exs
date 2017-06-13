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
      Repo.insert!(%CompanyEntry{value: "#{:rand.uniform(100)}", company_id: :rand.uniform(5), company_attribute_id: :rand.uniform(16)})
      seed(repo, entry_type, n-1)
  end
end

alias Nexpo.Repo

#Create some companies
alias Nexpo.Company
Repo.insert!(%Company{name: "Spotify"})
Repo.insert!(%Company{name: "Google"})
Repo.insert!(%Company{name: "IBM"})
Repo.insert!(%Company{name: "Intel"})
Repo.insert!(%Company{name: "Jesus wine makers"})

#Create some Categories
alias Nexpo.CompanyCategory

Repo.insert!(%CompanyCategory{title: "Logistik"})
Repo.insert!(%CompanyCategory{title: "Avtal"})
Repo.insert!(%CompanyCategory{title: "Övrigt"})
Repo.insert!(%CompanyCategory{title: "Event"})

#Create some Category attributes
alias Nexpo.CompanyAttribute

Repo.insert!(%CompanyAttribute{title: "Eluttag", company_category_id: 1})
Repo.insert!(%CompanyAttribute{title: "Internetkoder", company_category_id: 1})
Repo.insert!(%CompanyAttribute{title: "Ståbord", company_category_id: 1})
Repo.insert!(%CompanyAttribute{title: "Koli", company_category_id: 1})

Repo.insert!(%CompanyAttribute{title: "Beskrivning", company_category_id: 2})
Repo.insert!(%CompanyAttribute{title: "Länk till document", company_category_id: 2})
Repo.insert!(%CompanyAttribute{title: "Ansvarig", company_category_id: 2})
Repo.insert!(%CompanyAttribute{title: "Kontakt Uppgifter", company_category_id: 2})

Repo.insert!(%CompanyAttribute{title: "Udda beställning", company_category_id: 3})
Repo.insert!(%CompanyAttribute{title: "Extra ketchup", company_category_id: 3})
Repo.insert!(%CompanyAttribute{title: "Trevligthetsskala", company_category_id: 3})
Repo.insert!(%CompanyAttribute{title: "Länk till podio", company_category_id: 3})

Repo.insert!(%CompanyAttribute{title: "Lunchföreläsning", company_category_id: 4})
Repo.insert!(%CompanyAttribute{title: "Pub", company_category_id: 4})
Repo.insert!(%CompanyAttribute{title: "Yrkesvaskning", company_category_id: 4})
Repo.insert!(%CompanyAttribute{title: "Sabrering för nybörjare", company_category_id: 4})


#Create some random company entries
alias Nexpo.CompanyEntry

SeedEntries.seed(Repo, CompanyEntry, 100)

