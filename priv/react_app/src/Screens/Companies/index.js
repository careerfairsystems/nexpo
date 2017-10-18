import Companies from './Companies'
import { connect } from 'react-redux'

const stateful = connect(state => {
  return {
    companies: state.companies
  }
})

export default stateful(Companies)
