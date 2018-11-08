import { connect } from 'react-redux';
import Roles from './Roles';
import { Actions } from '../../../Store';
import type { State } from '../../../Store/reducers';

const mapStateToProps = (state: State) => ({
  roles: state.entities.roles,
  fetching: state.api.roles.fetching
});

const mapDispatchToProps = {
  deleteRole: Actions.roles.deleteRole,
  getAllRoles: Actions.roles.getAllRoles
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(Roles);
