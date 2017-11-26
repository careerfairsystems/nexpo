import ForgotPasswordEnterEmail from './ForgotPasswordEnterEmail'
import {Actions, State} from './../../Store'
import { connect } from 'react-redux';

const mapStateToProps = (state: State) => {
  return {
    success: state.api.forgot_password.success
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    callBackend: ({email}) => dispatch(Actions.accounts.forgot_password({email}))
  }
}

const stateful = connect(mapStateToProps, mapDispatchToProps)
export default stateful(ForgotPasswordEnterEmail)
