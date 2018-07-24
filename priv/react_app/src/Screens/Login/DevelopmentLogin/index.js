import { connect } from 'react-redux'
import DevelopmentLogin from './DevelopmentLogin'
import {Actions} from '../../../Store'

const mapStateToProps = (state, props) => ({
    error: state.auth.error,
    isLoggedIn: state.auth.isLoggedIn
  })

const mapDispatchToProps = (dispatch, props) => ({
    login: (email) => dispatch(Actions.auth.development_login(email))
  })

const stateful = connect(mapStateToProps, mapDispatchToProps)

export default stateful(DevelopmentLogin)
