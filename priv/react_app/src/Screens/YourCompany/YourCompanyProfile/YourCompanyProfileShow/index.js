import { reset } from 'redux-form';
import { connect } from 'react-redux';
import { Actions, Selectors } from '../../../../Store';
import YourCompanyProfileShow from './YourCompanyProfileShow';
import type { State } from '../../../../Store/reducers/index';

const mapStateToProps = (state: State) => ({
  currentCompany: Selectors.companies.getCurrentCompany(state),
  fetching: state.api.currentCompany.fetching
});

const mapDispatchToProps = {
  getCurrentCompany: Actions.companies.getCurrentCompany,
  resetForm: reset
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(YourCompanyProfileShow);
