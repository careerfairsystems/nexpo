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

const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(Actions.users.getCurrentUser()),
  updateCurrentUser: data => dispatch(Actions.users.updateCurrentUser(data)),
  updateCurrentStudent: data =>
    dispatch(Actions.users.updateCurrentStudent(data)),
  getAllCompanies: () => dispatch(Actions.companies.getAllCompanies()),
  createStudentSessionAppl: data =>
    dispatch(Actions.studentSessions.createStudentSessionAppl(data))
});

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(SessionApplication);
