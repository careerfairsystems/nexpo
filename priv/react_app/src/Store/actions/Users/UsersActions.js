import * as UserMeGetActions from './UserMeGetActions';
import * as UserMePutActions from './UserMePutActions';
import * as UserMeDeleteActions from './UserMeDeleteActions';
import * as UserMyStudentActions from './UserMyStudentActions';
import * as UsersDeleteActions from './UsersDeleteActions';
import * as UsersGetActions from './UsersGetActions';
import * as UsersGetAllActions from './UsersGetAllActions';
import * as UsersPostActions from './UsersPostActions';
import * as UsersPutActions from './UsersPutActions';

export default {
  ...UserMeGetActions,
  ...UserMePutActions,
  ...UserMeDeleteActions,
  ...UserMyStudentActions,
  ...UsersDeleteActions,
  ...UsersGetActions,
  ...UsersGetAllActions,
  ...UsersPostActions,
  ...UsersPutActions
};
