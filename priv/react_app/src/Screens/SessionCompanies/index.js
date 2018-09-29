import { connect } from 'react-redux';
import { Actions } from '../../Store';
import SessionCompanies from './SessionCompanies';
import { State } from '../../Store/reducers/index';

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
