import { connect } from 'react-redux';
import ForgotPasswordEnterEmail from './ForgotPasswordEnterEmail';
import { Actions, State } from '../../Store';

const mapStateToProps = (state: State) => ({
  success: state.api.forgot_password.success
});

const mapDispatchToProps = {
  callBackend: Actions.accounts.forgot_password
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default stateful(ForgotPasswordEnterEmail);
