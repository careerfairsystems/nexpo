import ProductionLogin from './ProductionLogin'
import { connect } from 'react-redux'

import Actions from '../../../store/actions'

const mapStateToProps = (state, props) => {
  return {
    error: state.login.error,
    isLoggedIn: state.login.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    login: ({email, password}) => dispatch(Actions.login.login({email, password}))
  }
}

const stateful = connect(mapStateToProps, mapDispatchToProps)

export default stateful(ProductionLogin)
