import AuthActions from './Auth';
import RolesActions from './Roles';
import UsersActions from './Users';
import CategoriesActions from './Categories';
import CompaniesActions from './Companies';
import DeadlinesActions from './Deadlines';
import MailtemplatesActions from './Mailtemplates';
import AccountActions from './Accounts';
import StudentSessionsActions from './StudentSessions';

export default {
  auth: AuthActions,
  roles: RolesActions,
  users: UsersActions,
  categories: CategoriesActions,
  companies: CompaniesActions,
  deadlines: DeadlinesActions,
  mailtemplates: MailtemplatesActions,
  accounts: AccountActions,
  studentSessions: StudentSessionsActions
};
