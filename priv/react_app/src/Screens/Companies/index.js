import Companies from './Companies'
import { connect } from 'react-redux'

const stateful = connect(state => {
  return {
    companies: state.entities.companies,
    fetching: state.entities.fetching  
  }
})

export default stateful(Companies)
