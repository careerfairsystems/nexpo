import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { Actions, Selectors } from '../../../Store';
import SessionApplication from './SessionApplication';
import type { State } from '../../../Store/reducers';

const mapStateToProps = (state: State) => ({
  availableCompanies: Selectors.companies.getNotAppliedTo(state),
  currentStudent: Selectors.students.getCurrentStudent(state),
  currentUser: Selectors.users.getCurrentUser(state),
  fetching: state.api.currentUser.fetching
});

const mapDispatchToProps = {
  createStudentSessionAppl: Actions.studentSessions.createStudentSessionAppl,
  getAllCompanies: Actions.companies.getAllCompanies,
  getCurrentUser: Actions.users.getCurrentUser,
  resetForm: reset,
  updateCurrentStudent: Actions.users.updateCurrentStudent,
  updateCurrentUser: Actions.users.updateCurrentUser
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(SessionApplication);
