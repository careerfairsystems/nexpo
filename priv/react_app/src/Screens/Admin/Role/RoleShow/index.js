import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { Actions } from '../../../../Store';
import Schema from '../../../../Store/normalizr/schema';
import RoleShow from './RoleShow';

const mapStateToProps = (state, props) => {
  const { fetching } = state.api.roles;
  const roleId = props.match.params.id;
  const role = state.entities.roles[roleId] || {};

  const users = denormalize(
    { users: role.users },
    Schema.roleSchema(),
    state.entities
  );

  return { id: roleId, role, users, fetching };
};

const mapDispatchToProps = {
  getRole: Actions.roles.getRole,
  createRole: Actions.roles.createRole,
  updateRole: Actions.roles.updateRole
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(RoleShow);
