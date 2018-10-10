import { connect } from 'react-redux';
import DevelopmentLogin from './DevelopmentLogin';
import { Actions } from '../../../../Store';

const mapStateToProps = state => ({
  error: state.auth.error,
  isLoggedIn: state.auth.isLoggedIn
});

const mapDispatchToProps = {
  login: Actions.auth.developmentLogin
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(DevelopmentLogin);
