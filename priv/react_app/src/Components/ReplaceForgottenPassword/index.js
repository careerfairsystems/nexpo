import ReplaceForgottenPassword from './ReplaceForgottenPassword'
import {connect} from 'react-redux'
import {Actions, State} from '../../Store/index';

const mapStateToProps = (state: State) => {
  return {
    keyIsValid: state.auth.forgotPassword.validKey
  }
}

const mapDispatchToprops = (dispatch, props) => {
  const {hashKey} = props
  const key = hashKey
  return {
    sendNewPasswordToBackend: ({password, password_confirmation}) => {
      dispatch(Actions.accounts.replace_forgotten_password({
        key, password, password_confirmation
      }))
    },
    verifyKey: () => {
      dispatch(Actions.accounts.verify_forgot_password_key({key}))
    }
  }
}

const stateful = connect(mapStateToProps, mapDispatchToprops)

export default stateful(ReplaceForgottenPassword)
