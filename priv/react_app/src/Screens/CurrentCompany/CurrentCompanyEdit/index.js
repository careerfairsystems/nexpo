import { connect } from 'react-redux';
import { Actions, Selectors } from '../../../Store';
import CurrentCompanyEdit from './CurrentCompanyEdit';
import { State } from '../../../Store/reducers/index';

const mapStateToProps = (state: State) => ({
  currentCompany: Selectors.companies.getCurrentCompany(state),
  fetching: state.api.current_company.fetching
});

const mapDispatchToProps = {
  getCurrentCompany: Actions.companies.getCurrentCompany,
  // destroyCurrentCompany: Actions.companies.destroyCurrentCompany,
  updateCurrentCompany: Actions.companies.updateCurrentCompany
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(CurrentCompanyEdit);
