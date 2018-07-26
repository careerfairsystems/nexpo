import auth from './Auth';
import users from './Users';
import CompaniesActions from './Companies';
import AccountActions from './Accounts';

export default {
  auth,
  users,
  companies: CompaniesActions,
  accounts: AccountActions
};
