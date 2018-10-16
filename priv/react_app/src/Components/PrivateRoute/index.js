import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import { Selectors } from '../../Store';

const mapStateToProps = state => ({
  currentUser: Selectors.users.getCurrentUser(state),
  fetching: state.api.currentUser.fetching,
  isLoggedIn: state.auth.isLoggedIn
});

const stateful = connect(
  mapStateToProps,
  undefined
);

export default stateful(PrivateRoute);
