import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { Actions } from '../../../../Store';
import Schema from '../../../../Store/normalizr/schema';
import RoleShow from './RoleShow';

const mapStateToProps = (state, props) => {
  const { fetching } = state.api.roles;
  const roleId = props.match.params.id;

  const {
    roles: [role]
  } = denormalize(
    { roles: [roleId] },
    { roles: Schema.rolesSchema() },
    state.entities
  );

  return { id: roleId, role, fetching };
};

const mapDispatchToProps = {
  getRole: Actions.roles.getRole
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(RoleShow);
