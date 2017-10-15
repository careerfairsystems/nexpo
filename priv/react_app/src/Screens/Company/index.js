import Company from './Company'
import { connect } from 'react-redux'

const stateful = connect(state => {
  return {
    companies: state.data.companies
  }
})

export default stateful(Company)
