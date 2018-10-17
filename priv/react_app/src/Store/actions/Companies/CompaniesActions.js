import * as CompaniesDeleteActions from './CompaniesDeleteActions';
import * as CompaniesGetActions from './CompaniesGetActions';
import * as CompaniesGetAllActions from './CompaniesGetAllActions';
import * as CompaniesPostActions from './CompaniesPostActions';
import * as CompaniesPutActions from './CompaniesPutActions';
import * as CompanyMeDeleteActions from './CompanyMeDeleteActions';
import * as CompanyMeGetActions from './CompanyMeGetActions';
import * as CompanyMePutActions from './CompanyMePutActions';


export default {
  ...CompaniesDeleteActions,
  ...CompaniesGetActions,
  ...CompaniesGetAllActions,
  ...CompaniesPostActions,
  ...CompaniesPutActions,
  ...CompanyMeDeleteActions,
  ...CompanyMeGetActions,
  ...CompanyMePutActions
};
