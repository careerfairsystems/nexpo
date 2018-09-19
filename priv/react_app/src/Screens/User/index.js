import { connect } from 'react-redux';
import User from './User';
import { State } from '../../Store/reducers/index';

const mapStateToProps = (state: State) => ({
  currentUser: state.entities.users[state.current.user] || {},
  fetching: state.api.current_user.fetching
});

const mapDispatchToProps = dispatch => ({});

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(User);
