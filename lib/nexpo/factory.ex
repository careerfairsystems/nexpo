defmodule Nexpo.Factory do
    use ExMachina.Ecto, repo: Nexpo.Repo

    def company_factory do
        %Nexpo.Company{
            name: sequence("Generated Company"),
            email: sequence("Generated@email.com")

            # entries: [build(:company_entry)]
        }
    end

    def company_category_factory do
        %Nexpo.CompanyCategory{
            title: sequence("Generated Category"),

            # attributes: [build(:company_attribute)]
        }
    end

    def company_attribute_factory do
        %Nexpo.CompanyAttribute{
            title: sequence("Generated Attribute"),
            type: sequence("Generated type"),
            value: sequence("Generated value"),

            category: build(:company_category),
            # entries: [build(:company_entry)]
        }
    end

    def company_entry_factory do
        %Nexpo.CompanyEntry{
            value: sequence("Generated value"),

            company: build(:company),
            attribute: build(:company_attribute)
        }
    end

end
