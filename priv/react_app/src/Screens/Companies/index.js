import { connect } from 'react-redux';
import Companies from './Companies';
import { Actions } from '../../Store';
import type { State } from '../../Store/reducers/reducers';

const mapStateToProps = (state: State) => ({
  companies: state.entities.companies,
  fetching: state.api.companies.fetching
});

const mapDispatchToProps = {
  deleteCompany: Actions.companies.destroyCompany,
  getAllCompanies: Actions.companies.getAllCompanies
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(Companies);
