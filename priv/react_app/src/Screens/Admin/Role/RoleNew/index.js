import { connect } from 'react-redux';
import { Actions } from '../../../../Store';
import RoleNew from './RoleNew';

const mapDispatchToProps = {
  createRole: Actions.roles.createRole
};

const stateful = connect(
  null,
  mapDispatchToProps
);

export default stateful(RoleNew);
