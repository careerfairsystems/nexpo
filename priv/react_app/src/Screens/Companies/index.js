import { connect } from 'react-redux'
import Companies from './Companies'
import {Actions} from '../../Store'
import { State } from '../../Store/reducers/index';

const mapStateToProps = (state: State, props) => ({
    companies: state.entities.companies,
    fetching: state.api.companies.fetching
  })

const mapDispatchToProps = (dispatch, props) => ({
    getAllCompanies: () => dispatch(Actions.companies.getAllCompanies())
  })

const stateful = connect(mapStateToProps, mapDispatchToProps)

export default stateful(Companies)
