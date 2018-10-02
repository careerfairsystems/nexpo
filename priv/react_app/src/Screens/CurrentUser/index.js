import { connect } from 'react-redux';
import { Actions, Selectors } from '../../Store';
import CurrentUser from './CurrentUser';
import { State } from '../../Store/reducers/index';

const mapStateToProps = (state: State) => ({
  currentUser: Selectors.users.getCurrentUser(state),
  currentStudent: Selectors.students.getCurrentStudent(state),
  fetching: state.api.current_user.fetching
});

const mapDispatchToProps = {
  getCurrentUser: Actions.users.getCurrentUser,
  destroyCurrentUser: Actions.users.destroyCurrentUser,
  logout: Actions.auth.logout,
  updateCurrentUser: Actions.users.updateCurrentUser,
  updateCurrentStudent: Actions.users.updateCurrentStudent
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(CurrentUser);
