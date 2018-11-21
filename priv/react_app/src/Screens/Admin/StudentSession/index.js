import { connect } from 'react-redux';
import StudentSession from './StudentSession';
import { Actions } from '../../../Store';
import type { State } from '../../../Store/reducers';

const mapStateToProps = (state: State) => ({
  companies: state.entities.companies,
  fetching: state.api.companies.fetching
});

const mapDispatchToProps = {
  deleteCompany: Actions.companies.deleteCompany,
  getAllCompanies: Actions.companies.getAllCompanies,
  createBulkStudentSessions: Actions.studentSessions.createBulkStudentSessions
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(StudentSession);
