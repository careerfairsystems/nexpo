import Companies from './Companies'
import { connect } from 'react-redux'

const stateful = connect(state => {
  return {
    companies: state.companyState.companies,
    fetching: state.companyState.fetching  
  }
})

export default stateful(Companies)
