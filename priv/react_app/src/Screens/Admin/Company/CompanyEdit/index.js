import { reset } from 'redux-form';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { Actions } from '../../../../Store';
import Schema from '../../../../Store/normalizr/schema';
import CompanyEdit from './CompanyEdit';

const mapStateToProps = (state, props) => {
  const companyId = props.match.params.id;
  const company = state.entities.companies[companyId] || {};
  const { fetching } = state.api.companies;

  const entries = denormalize(
    { entries: company.entries },
    Schema.companySchema(),
    state.entities
  );

  return { id: companyId, company, entries, fetching };
};

const mapDispatchToProps = {
  getCompany: Actions.companies.getCompany,
  updateCompany: Actions.companies.updateCompany,
  resetForm: reset
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(CompanyEdit);
