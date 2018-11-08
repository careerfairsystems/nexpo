import { connect } from 'react-redux';
import Mailtemplates from './Mailtemplates';
import { Actions } from '../../../Store';
import type { State } from '../../../Store/reducers';

const mapStateToProps = (state: State) => ({
  mailtemplates: state.entities.mailtemplates,
  fetching: state.api.mailtemplates.fetching
});

const mapDispatchToProps = {
  deleteMailtemplate: Actions.mailtemplates.deleteMailtemplate,
  getAllMailtemplates: Actions.mailtemplates.getAllMailtemplates
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(Mailtemplates);
