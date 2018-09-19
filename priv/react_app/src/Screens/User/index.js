import { connect } from 'react-redux';
import User from './User';
import { Actions } from '../../Store';
import { State } from '../../Store/reducers/index';

const mapStateToProps = (state: State) => ({
  currentUser: state.entities.users[state.current.user] || {}
});

const mapDispatchToProps = dispatch => ({});

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(User);
