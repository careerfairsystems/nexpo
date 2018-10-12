import { connect } from 'react-redux';
import { Actions } from '../../../../Store';
import RoleEdit from './RoleEdit';

const mapStateToProps = (state, props) => {
  const { fetching } = state.api.roles;
  const roleId = props.match.params.id;
  const role = state.entities.roles[roleId] || {};

  return { id: roleId, role, fetching };
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

export default stateful(RoleEdit);
