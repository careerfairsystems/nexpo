import { connect } from 'react-redux';
import App from './App';
import { Actions, Selectors } from '../Store';

const mapStateToProps = (state, { location, history }) => ({
  isLoggedIn: state.auth.isLoggedIn,
  currentUser: Selectors.users.getCurrentUser(state),
  pathname: location.pathname,
  redirect: history.push
});

const mapDispatchToProps = {
  logout: Actions.auth.logout
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(App);
