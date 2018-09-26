import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { Actions } from '../../Store';
import SessionApplication from './SessionApplication';
import Schema from '../../Store/normalizr/schema';
import { State } from '../../Store/reducers/index';

const mapStateToProps = (state: State) => {
  const currentUser = state.entities.users[state.current.user] || {};
  const { roles } = denormalize(
    { roles: currentUser.roles },
    Schema.userSchema(),
    state.entities
  );

  return {
    companies: state.entities.companies,
    currentUser: { ...currentUser, roles },
    fetching: state.api.current_user.fetching
  };
};

const mapDispatchToProps = {
  getCurrentUser: Actions.users.getCurrentUser,
  updateCurrentUser: Actions.users.updateCurrentUser,
  updateCurrentStudent: Actions.users.updateCurrentStudent,
  getAllCompanies: Actions.companies.getAllCompanies,
  createStudentSessionAppl: Actions.studentSessions.createStudentSessionAppl
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(SessionApplication);
