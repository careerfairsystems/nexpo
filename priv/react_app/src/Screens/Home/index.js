import { connect } from 'react-redux';
import Home from './Home';
import { Selectors } from '../../Store';
import type { State } from '../../Store/reducers';

const mapStateToProps = (state: State) => ({
  currentUser: Selectors.users.getCurrentUser(state),
  fetching: state.api.currentUser.fetching
});

const stateful = connect(mapStateToProps);

export default stateful(Home);
