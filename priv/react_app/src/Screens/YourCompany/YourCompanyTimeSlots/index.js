import { connect } from 'react-redux';
import { Actions, Selectors } from '../../../Store';
import YourCompanyTimeSlots from './YourCompanyTimeSlots';
import type { State } from '../../../Store/reducers/index';

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

export default stateful(YourCompanyTimeSlots);
