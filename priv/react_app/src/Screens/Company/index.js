import { connect } from 'react-redux';
import { denormalize, schema } from 'normalizr';
import Company from './Company';

const getSchema = () => {
  const entry = new schema.Entity('entries');

  const company = new schema.Entity('companies', {
    entries: [entry]
  });

  return company;
};

const stateful = connect((state, props) => {
  const companyId = props.match.params.id;
  const company = state.entities.companies[companyId] || {};

  const entries = denormalize(
    { entries: company.entries },
    getSchema(),
    state.entities
  );

  return { company, entries };
});

export default stateful(Company);
