import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { Actions, Selectors } from '../../../Store';
import SessionApplication from './SessionApplication';
import type { State } from '../../../Store/reducers';

const mapStateToProps = (state: State) => ({
  currentStudent: Selectors.students.getCurrentStudent(state),
  currentUser: Selectors.users.getCurrentUser(state),
  fetching: state.api.currentUser.fetching
});

const mapDispatchToProps = {
  createStudentSessionAppl: Actions.studentSessions.createStudentSessionAppl,
  getAllCompanies: Actions.companies.getAllCompanies,
  getAllProgrammes: Actions.programmes.getAllProgrammes,
  getCurrentUser: Actions.users.getCurrentUser,
  updateCurrentStudent: Actions.users.updateCurrentStudent,
  updateCurrentUser: Actions.users.updateCurrentUser,
  resetForm: reset
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(SessionApplication);
