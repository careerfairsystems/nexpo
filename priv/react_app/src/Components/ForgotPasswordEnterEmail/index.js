import { connect } from 'react-redux';
import ForgotPasswordEnterEmail from './ForgotPasswordEnterEmail';
import { Actions } from '../../Store';
import type { State } from '../../Store/reducers';

const mapStateToProps = (state: State) => ({
  success: state.api.forgotPassword.success
});

const mapDispatchToProps = {
  callBackend: Actions.accounts.forgotPassword
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default stateful(ForgotPasswordEnterEmail);
