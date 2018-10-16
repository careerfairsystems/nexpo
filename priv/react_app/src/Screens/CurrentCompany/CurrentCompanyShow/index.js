import { connect } from 'react-redux';
import { Actions, Selectors } from '../../../Store';
import CurrentCompanyShow from './CurrentCompanyShow';
import { State } from '../../../Store/reducers/index';

const mapStateToProps = (state: State) => ({
  currentCompany: Selectors.companies.getCurrentCompany(state),
  fetching: state.api.currentCompany.fetching
});

const mapDispatchToProps = {
  getCurrentCompany: Actions.companies.getCurrentCompany
  // destroyCurrentCompany: Actions.companies.destroyCurrentCompany
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(CurrentCompanyShow);
