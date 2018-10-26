import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import ReplaceForgottenPassword from './ReplaceForgottenPassword';
import { Actions } from '../../Store';
import type { State } from '../../Store/reducers';

const mapStateToProps = (state: State) => ({
  keyIsValid: state.auth.forgotPassword.validKey,
  errors: state.api.replacePassword.errors || {},
  success: state.api.replacePassword.success
});

const mapDispatchToprops = (dispatch: Dispatch<any>, props) => {
  const { hashKey } = props;
  const key = hashKey;
  return {
    sendNewPasswordToBackend: ({ password, passwordConfirmation }) =>
      dispatch(
        Actions.accounts.replaceForgottenPassword({
          key,
          password,
          passwordConfirmation
        })
      ),
    verifyKey: () => dispatch(Actions.accounts.verifyForgotPasswordKey({ key }))
  };
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToprops
);

export default stateful(ReplaceForgottenPassword);
