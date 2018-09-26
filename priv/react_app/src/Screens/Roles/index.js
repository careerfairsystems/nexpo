import { connect } from 'react-redux';
import Roles from './Roles';
import { Actions } from '../../Store';
import { State } from '../../Store/reducers/index';

const mapStateToProps = (state: State) => ({
  roles: state.entities.roles,
  fetching: state.api.roles.fetching
});

const mapDispatchToProps = {
  getAllRoles: Actions.roles.getAllRoles
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(Roles);
