import { connect } from 'react-redux';
import Categories from './Categories';
import { Actions } from '../../../Store';
import type { State } from '../../../Store/reducers';

const mapStateToProps = (state: State) => ({
  categories: state.entities.categories,
  attributes: state.entities.attributes,
  fetching: state.api.categories.fetching
});

const mapDispatchToProps = {
  getAllCategories: Actions.categories.getAllCategories,
  createCategory: Actions.categories.createCategory
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(Categories);
