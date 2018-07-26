import { connect } from 'react-redux';
import ForgotPasswordEnterEmail from './ForgotPasswordEnterEmail';
import { Actions, State } from '../../Store';

const mapStateToProps = (state: State) => ({
  success: state.api.forgot_password.success
});

const mapDispatchToProps = dispatch => ({
  callBackend: ({ email }) =>
    dispatch(Actions.accounts.forgot_password({ email }))
});

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default stateful(ForgotPasswordEnterEmail);
