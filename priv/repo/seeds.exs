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
      Repo.insert!(%CompanyEntry{value: "#{:rand.uniform(100)}", company_id: :rand.uniform(5), category_attribute_id: :rand.uniform(16)})
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
alias Nexpo.Category

Repo.insert!(%Category{title: "Logistik"})
Repo.insert!(%Category{title: "Avtal"})
Repo.insert!(%Category{title: "Övrigt"})
Repo.insert!(%Category{title: "Event"})

#Create some Category attributes
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


#Create some random company entries
alias Nexpo.CompanyEntry

SeedEntries.seed(Repo, CompanyEntry, 100)
