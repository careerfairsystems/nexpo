import { denormalize } from 'normalizr';
import Schema from '../../normalizr/schema';
import users from '../Users';
import type { State } from '../../reducers';

export const getCurrentCompany = (state: State) => {
  const currentUser = users.getCurrentUser(state);

  const {
    representative: {
      company: { id: companyId }
    }
  } = currentUser;

  const {
    companies: [company]
  } = denormalize(
    { companies: [companyId] },
    { companies: Schema.companiesSchema() },
    state.entities
  );

  return company;
};

export default { getCurrentCompany };
