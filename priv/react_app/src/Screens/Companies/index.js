import Companies from './Companies'
import { connect } from 'react-redux'

const stateful = connect(state => {
  return {
    companies: state.entities.companies,
    fetching: state.fetching.companies,
  }
})

export default stateful(Companies)
