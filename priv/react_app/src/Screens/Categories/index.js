import { connect } from 'react-redux';
import Categories from './Categories';
import { Actions } from '../../Store';
import { State } from '../../Store/reducers/index';

const mapStateToProps = (state: State) => ({
  categories: state.entities.categories,
  attributes: state.entities.attributes,
  fetching: state.api.categories.fetching
});

const mapDispatchToProps = dispatch => ({
  getAllCategories: () => dispatch(Actions.categories.getAllCategories())
});

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(Categories);
