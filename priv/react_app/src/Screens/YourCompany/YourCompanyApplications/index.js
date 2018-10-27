import { connect } from 'react-redux';
import { Actions, Selectors } from '../../../Store';
import YourCompanyApplications from './YourCompanyApplications';
import type { State } from '../../../Store/reducers/index';

const mapStateToProps = (state: State) => ({
  currentCompany: Selectors.companies.getCurrentCompany(state),
  fetching: state.api.currentCompany.fetching,
  updating: state.api.studentSession.fetching
});

const mapDispatchToProps = {
  getCurrentCompany: Actions.companies.getCurrentCompany,
  updateStudentSessionAppl: Actions.studentSessions.updateStudentSessionAppl
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(YourCompanyApplications);
