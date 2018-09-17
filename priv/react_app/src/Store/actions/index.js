import auth from './Auth';
import users from './Users';
import CategoriesActions from './Categories';
import CompaniesActions from './Companies';
import AccountActions from './Accounts';

export default {
  auth,
  users,
  categories: CategoriesActions,
  companies: CompaniesActions,
  accounts: AccountActions
};
