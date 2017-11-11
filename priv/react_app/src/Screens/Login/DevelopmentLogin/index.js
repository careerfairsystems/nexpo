import DevelopmentLogin from './DevelopmentLogin'
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
    login: (email) => dispatch(Actions.auth.development_login(email))
  }
}

const stateful = connect(mapStateToProps, mapDispatchToProps)

export default stateful(DevelopmentLogin)
