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
  updateCurrentUser: Actions.users.updateCurrentUser,
  updateCurrentStudent: Actions.users.updateCurrentStudent,
  getAllProgrammes: Actions.programmes.getAllProgrammes,
  deleteCurrentUser: Actions.users.deleteCurrentUser,
  logout: Actions.auth.logout,
  resetForm: reset
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(CurrentUser);
