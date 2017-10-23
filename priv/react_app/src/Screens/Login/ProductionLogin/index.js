import ProductionLogin from './ProductionLogin'
import { connect } from 'react-redux'

import {login} from '../../../store/ActionCreators'

const mapStateToProps = (state, props) => {
  return {
    error: state.login.error,
    isLoggedIn: state.login.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    login: ({email, password}) => dispatch(login({email, password}))
  }
}

const stateful = connect(mapStateToProps, mapDispatchToProps)

export default stateful(ProductionLogin)
