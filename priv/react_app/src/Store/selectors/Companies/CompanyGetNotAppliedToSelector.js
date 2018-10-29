import { filter, map, sortBy } from 'lodash/fp';
import { Selectors } from '../..';
import type { State } from '../../reducers';

export const getNotAppliedTo = (state: State) => {
  const applications = Selectors.students.getCurrentSessionAppl(state);
  const companies = state.entities.companies || [];
  const companiesAppliedTo = map('companyId', applications);
  const notAppliedTo = sortBy(
    'name',
    filter(
      c => c.studentSessionDays && !companiesAppliedTo.includes(c.id),
      companies
    )
  );

  return notAppliedTo;
};

export default { getNotAppliedTo };
