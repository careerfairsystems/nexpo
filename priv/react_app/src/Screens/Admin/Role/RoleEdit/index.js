import { connect } from 'react-redux';
import { Actions } from '../../../../Store';
import RoleEdit from './RoleEdit';

const mapStateToProps = (state, props) => {
  const roleId = props.match.params.id;
  const role = state.entities.roles[roleId] || {};

  return {
    id: roleId,
    role,
    fetchingRoles: state.api.roles.fetching,
    fetchingUsers: state.api.users.fetching
  };
};

const mapDispatchToProps = {
  getRole: Actions.roles.getRole,
  updateRole: Actions.roles.updateRole,
  getAllUsers: Actions.users.getAllUsers
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(RoleEdit);
