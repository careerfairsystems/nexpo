import * as CompanyGetCurrentSelector from './CompanyGetCurrentSelector';
import * as CompanyGetNotAppliedToSelector from './CompanyGetNotAppliedToSelector';

export default {
  ...CompanyGetCurrentSelector,
  ...CompanyGetNotAppliedToSelector
};
