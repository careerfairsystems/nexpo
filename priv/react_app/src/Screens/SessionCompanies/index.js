import { connect } from 'react-redux';
import { Actions } from '../../Store';
import SessionCompanies from './SessionCompanies';
import type { State } from '../../Store/reducers/reducers';

const mapStateToProps = (state: State) => ({
  companies: state.entities.companies
});

const mapDispatchToProps = {
  getAllCompanies: Actions.companies.getAllCompanies
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(SessionCompanies);
