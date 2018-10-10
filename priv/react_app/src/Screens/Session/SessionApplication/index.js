import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { Actions, Selectors } from '../../../Store';
import SessionApplication from './SessionApplication';
import type { State } from '../../../Store/reducers';

const mapStateToProps = (state: State) => ({
  companies: state.entities.companies,
  currentUser: Selectors.users.getCurrentUser(state),
  currentStudent: Selectors.students.getCurrentStudent(state),
  fetching: state.api.current_user.fetching
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
