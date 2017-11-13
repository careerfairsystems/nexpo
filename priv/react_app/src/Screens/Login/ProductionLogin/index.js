import ProductionLogin from './ProductionLogin'
import { connect } from 'react-redux'

import {Actions} from './../../../Store'

const mapStateToProps = (state, props) => {
  return {
    error: state.auth.error,
    isLoggedIn: state.auth.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    login: ({email, password}) => dispatch(Actions.auth.login({email, password}))
  }
}

const stateful = connect(mapStateToProps, mapDispatchToProps)

export default stateful(ProductionLogin)
