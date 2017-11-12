import Companies from './Companies'
import { connect } from 'react-redux'
import {Actions} from './../../Store'

const mapStateToProps = (state, props) => {
  return {
    companies: state.entities.companies,
    fetching: state.fetching.companies,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    getAllCompanies: () => dispatch(Actions.companies.getAllCompanies())
  }
}

const stateful = connect(mapStateToProps, mapDispatchToProps)

export default stateful(Companies)
