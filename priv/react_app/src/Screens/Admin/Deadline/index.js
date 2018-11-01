import { reset } from 'redux-form';
import { connect } from 'react-redux';
import { Actions } from '../../../Store';
import Deadline from './Deadline';

const mapStateToProps = (state, props) => {
  const deadlineId = props.match.params.id;
  const deadline = state.entities.deadlines[deadlineId] || {};
  const { fetching } = state.api.deadlines;

  return { id: deadlineId, deadline, fetching };
};

const mapDispatchToProps = {
  getDeadline: Actions.deadlines.getDeadline,
  createDeadline: Actions.deadlines.createDeadline,
  updateDeadline: Actions.deadlines.updateDeadline,
  resetForm: reset
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(Deadline);
