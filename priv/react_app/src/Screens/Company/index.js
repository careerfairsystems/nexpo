import { reset } from 'redux-form';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { Actions } from '../../Store';
import Schema from '../../Store/normalizr/schema';
import Company from './Company';

const mapStateToProps = (state, props) => {
  const companyId = props.match.params.id;
  const company = state.entities.companies[companyId] || {};
  const fetching = state.api.companies.fetching;
  const entries = denormalize(
    { entries: company.entries },
    Schema.companySchema(),
    state.entities
  );

  return { id: companyId, company, entries, fetching };
};

const mapDispatchToProps = {
  getCompany: Actions.companies.getCompany,
  createCompany: Actions.companies.createCompany,
  updateCompany: Actions.companies.updateCompany,
  resetForm: reset
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(Company);
