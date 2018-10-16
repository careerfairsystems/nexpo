import { connect } from 'react-redux';
import { Actions } from '../../../Store';
import SessionCompanies from './SessionCompanies';
import type { State } from '../../../Store/reducers';

const mapStateToProps = (state: State) => ({
  companies: state.entities.companies,
  fetching: state.api.companies.fetching
});

const mapDispatchToProps = {
  getAllCompanies: Actions.companies.getAllCompanies
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(SessionCompanies);
