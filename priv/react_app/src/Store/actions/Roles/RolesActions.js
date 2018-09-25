import * as RolesDeleteActions from './RolesDeleteActions';
import * as RolesGetActions from './RolesGetActions';
import * as RolesGetAllActions from './RolesGetAllActions';
import * as RolesPostActions from './RolesPostActions';
import * as RolesPutActions from './RolesPutActions';

export default {
  ...RolesDeleteActions,
  ...RolesGetActions,
  ...RolesGetAllActions,
  ...RolesPostActions,
  ...RolesPutActions
};
