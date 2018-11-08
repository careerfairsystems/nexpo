import { connect } from 'react-redux';
import Deadlines from './Deadlines';
import { Actions } from '../../../Store';
import type { State } from '../../../Store/reducers';

const mapStateToProps = (state: State) => ({
  deadlines: state.entities.deadlines,
  fetching: state.api.deadlines.fetching
});

const mapDispatchToProps = {
  deleteDeadline: Actions.deadlines.deleteDeadline,
  getAllDeadlines: Actions.deadlines.getAllDeadlines
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(Deadlines);
