import ForgotPasswordEnterEmail from './ForgotPasswordEnterEmail'
import {Actions} from './../../Store'
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    callBackend: ({email}) => dispatch(Actions.accounts.forgot_password({email}))
  }
}

const stateful = connect(mapStateToProps, mapDispatchToProps)
export default stateful(ForgotPasswordEnterEmail)
