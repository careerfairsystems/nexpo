import { connect } from 'react-redux';
import { Actions, Selectors } from '../../../Store';
import SessionApplications from './SessionApplications';
import type { State } from '../../../Store/reducers';

const mapStateToProps = (state: State) => ({
  applications: Selectors.students.getCurrentSessionAppl(state),
  companies: state.entities.companies,
  fetching: state.api.currentUser.fetching
});

const mapDispatchToProps = {
  getCurrentUser: Actions.users.getCurrentUser,
  getAllCompanies: Actions.companies.getAllCompanies,
  deleteStudentSessionAppl: Actions.studentSessions.deleteStudentSessionAppl,
  updateStudentSessionAppl: Actions.studentSessions.updateStudentSessionAppl
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(SessionApplications);
