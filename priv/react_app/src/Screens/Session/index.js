import { connect } from 'react-redux';
import Session from './Session';
import { Actions } from '../../Store';
import type { State } from '../../Store/reducers';

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(Session);
