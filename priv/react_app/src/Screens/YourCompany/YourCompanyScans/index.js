import { connect } from 'react-redux';
import type { State } from '../../../Store/reducers/index';
import YourCompanyScans from './YourCompanyScans';
import { Selectors, Actions } from '../../../Store';

const mapStateToProps = (state: State) => ({
  currentCompany: Selectors.companies.getCurrentCompany(state),
  fetching: state.api.currentCompany.fetching
});

const mapDispatchToProps = {
  getCurrentCompany: Actions.companies.getCurrentCompany
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(YourCompanyScans);
