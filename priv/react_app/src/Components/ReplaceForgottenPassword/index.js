import { connect } from 'react-redux';
import ReplaceForgottenPassword from './ReplaceForgottenPassword';
import { Actions } from '../../Store';
import type { State } from '../../Store/reducers';

const mapStateToProps = (state: State) => ({
  keyIsValid: state.auth.forgotPassword.validKey,
  errors: state.api.replace_password.errors || {},
  success: state.api.replace_password.success
});

const mapDispatchToprops = (dispatch, props) => {
  const { hashKey } = props;
  const key = hashKey;
  return {
    sendNewPasswordToBackend: ({ password, password_confirmation }) => {
      dispatch(
        Actions.accounts.replace_forgotten_password({
          key,
          password,
          password_confirmation
        })
      );
    },
    verifyKey: () => {
      dispatch(Actions.accounts.verify_forgot_password_key({ key }));
    }
  };
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToprops
);

export default stateful(ReplaceForgottenPassword);
