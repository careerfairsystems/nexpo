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

const mapDispatchToProps = dispatch => ({
  getCompany: id => dispatch(Actions.companies.getCompany(id)),
  createCompany: company => dispatch(Actions.companies.createCompany(company)),
  resetForm: () => dispatch(reset('company')),
  updateCompany: (id, company) =>
    dispatch(Actions.companies.updateCompany(id, company))
});

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(Company);
