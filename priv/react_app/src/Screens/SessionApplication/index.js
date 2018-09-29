import { connect } from 'react-redux';
import { Actions, Selectors } from '../../Store';
import SessionApplication from './SessionApplication';
import { State } from '../../Store/reducers/index';

const mapStateToProps = (state: State) => ({
  companies: state.entities.companies,
  currentUser: Selectors.users.getCurrentUser(state),
  currentStudent: Selectors.students.getCurrentStudent(state),
  fetching: state.api.current_user.fetching
});

const mapDispatchToProps = {
  getCurrentUser: Actions.users.getCurrentUser,
  updateCurrentUser: Actions.users.updateCurrentUser,
  updateCurrentStudent: Actions.users.updateCurrentStudent,
  getAllCompanies: Actions.companies.getAllCompanies,
  createStudentSessionAppl: Actions.studentSessions.createStudentSessionAppl
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(SessionApplication);
