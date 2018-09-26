import { connect } from 'react-redux';
import { Actions, Selectors } from '../../Store';
import CurrentUser from './CurrentUser';
import { State } from '../../Store/reducers/index';

const mapStateToProps = (state: State) => ({
  currentUser: Selectors.users.getCurrentUser(state),
  fetching: state.api.current_user.fetching
});

const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(Actions.users.getCurrentUser()),
  updateCurrentUser: data => dispatch(Actions.users.updateCurrentUser(data)),
  updateCurrentStudent: data =>
    dispatch(Actions.users.updateCurrentStudent(data))
});

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(CurrentUser);
