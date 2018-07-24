import { connect } from 'react-redux'
import Company from './Company'

const stateful = connect((state, props) => {
  const companyId = props.match.params.id
  return {
    company: state.entities.companies[companyId] || {}
  }
})

export default stateful(Company)
