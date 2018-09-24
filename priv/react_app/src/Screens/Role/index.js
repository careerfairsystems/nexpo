import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { Actions } from '../../Store';
import Schema from '../../Store/normalizr/schema';
import Role from './Role';

const mapStateToProps = (state, props) => {
  const roleId = props.match.params.id;
  const role = state.entities.roles[roleId] || {};

  const entries = denormalize(
    { entries: role.entries },
    Schema.roleSchema(),
    state.entities
  );

  return { id: roleId, role, entries };
};

const mapDispatchToProps = dispatch => ({
  getRole: id => dispatch(Actions.roles.getRole(id))
});

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(Role);
