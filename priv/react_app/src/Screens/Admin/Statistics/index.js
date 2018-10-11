import { connect } from 'react-redux';
import Statistics from './Statistics';
import { Actions } from '../../../Store';
import type { State } from '../../../Store/reducers';

const mapStateToProps = (state: State) => ({
  statistics: state.entities.statistics
});

const mapDispatchToProps = {
  getAllStatistics: Actions.statistics.getAllStatistics
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(Statistics);
