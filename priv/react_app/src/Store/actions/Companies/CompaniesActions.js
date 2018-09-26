import * as CompaniesDeleteActions from './CompaniesDeleteActions';
import * as CompaniesGetActions from './CompaniesGetActions';
import * as CompaniesGetAllActions from './CompaniesGetAllActions';
import * as CompaniesPostActions from './CompaniesPostActions';
import * as CompaniesPutActions from './CompaniesPutActions';

export default {
  ...CompaniesDeleteActions,
  ...CompaniesGetActions,
  ...CompaniesGetAllActions,
  ...CompaniesPostActions,
  ...CompaniesPutActions
};
