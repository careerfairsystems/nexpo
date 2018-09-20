import { connect } from 'react-redux';
import App from './App';
import { Actions } from '../Store';

const mapStateToProps = (state, { location, history }) => ({
  isLoggedIn: state.auth.isLoggedIn,
  currentUser: state.entities.users[state.current.user] || {},
  pathname: location.pathname,
  redirect: history.push
});

const mapDispatchToProps = (dispatch, props) => ({
  logout: () => dispatch(Actions.auth.logout())
});

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(App);
