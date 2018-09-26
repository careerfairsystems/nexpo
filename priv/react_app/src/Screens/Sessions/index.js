import { connect } from 'react-redux';
import SessionApplication from './SessionApplication';
import { Actions } from '../../Store';
import { State } from '../../Store/reducers/index';

const mapStateToProps = (state: State) => ({
  companies: state.entities.companies
});

const mapDispatchToProps = dispatch => ({
  getAllCompanies: () => dispatch(Actions.companies.getAllCompanies())
});

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(SessionApplication);
