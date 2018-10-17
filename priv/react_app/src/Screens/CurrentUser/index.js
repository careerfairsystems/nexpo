import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { Actions, Selectors } from '../../Store';
import CurrentUser from './CurrentUser';
import type { State } from '../../Store/reducers';

const mapStateToProps = (state: State) => ({
  currentUser: Selectors.users.getCurrentUser(state),
  currentStudent: Selectors.students.getCurrentStudent(state),
  fetching: state.api.currentUser.fetching
});

const mapDispatchToProps = {
  getCurrentUser: Actions.users.getCurrentUser,
  destroyCurrentUser: Actions.users.destroyCurrentUser,
  logout: Actions.auth.logout,
  resetForm: reset,
  updateCurrentUser: Actions.users.updateCurrentUser,
  updateCurrentStudent: Actions.users.updateCurrentStudent
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(CurrentUser);
