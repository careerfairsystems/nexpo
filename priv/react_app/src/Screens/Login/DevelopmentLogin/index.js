import DevelopmentLogin from './DevelopmentLogin'
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
    login: (email) => dispatch(Actions.login.development_login(email))
  }
}

const stateful = connect(mapStateToProps, mapDispatchToProps)

export default stateful(DevelopmentLogin)
