import { connect } from 'react-redux';
import { Actions, Selectors } from '../../../Store';
import SessionsApproved from './SessionsApproved';
import type { State } from '../../../Store/reducers';

const mapStateToProps = (state: State) => ({
  sessions: Selectors.students.getCurrentSessions(state),
  companies: state.entities.companies,
  fetching: state.api.currentUser.fetching
});

const mapDispatchToProps = {
  getCurrentUser: Actions.users.getCurrentUser,
  getAllCompanies: Actions.companies.getAllCompanies,
  updateSession: Actions.studentSessions.updateStudentSession
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(SessionsApproved);
