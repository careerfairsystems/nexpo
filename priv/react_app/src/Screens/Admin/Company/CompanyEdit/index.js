import { reset } from 'redux-form';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { Actions } from '../../../../Store';
import Schema from '../../../../Store/normalizr/schema';
import CompanyEdit from './CompanyEdit';

const mapStateToProps = (state, props) => {
  const companyId = props.match.params.id;
  const { fetching } = state.api.companies;

  const {
    companies: [company]
  } = denormalize(
    { companies: [companyId] },
    { companies: Schema.companiesSchema() },
    state.entities
  );

  return { id: companyId, company, fetching };
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
