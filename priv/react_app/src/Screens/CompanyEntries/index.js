import CompanyEntries from './CompanyEntries'
import { connect } from 'react-redux'

const stateful = connect((state, props) => {
  const companyId = props.match.params.id
  console.log(state)
  let entries = null
  let attributes = null
  let categories = null
  if (state.entities.companies[companyId]) {
    const entryIds = state.entities.companies[companyId].entries
    entries = entryIds.map(id => {
      return state.entities.entries[id]
    })


    attributes = entries.map(entry => {
      return state.entities.attributes[entry.attribute]
    })

    categories = attributes.map(attribute => {
      return state.entities.categories[attribute.category]
    })
  }

  console.log("Entries: " + JSON.stringify(entries))
  console.log("Attributes: " + JSON.stringify(attributes))
  console.log("Categories: " + JSON.stringify(categories))
  return {
    company: state.entities.companies[companyId] || {},
    entries: entries || {},
    attributes: attributes || {},
    categories: categories || {}
  }
})

export default stateful(CompanyEntries)
