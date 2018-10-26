import { connect } from 'react-redux';
import { Actions } from '../../../Store';
import type { State } from '../../../Store/reducers';
import Category from './Category';

const mapStateToProps = (state: State, props) => {
  const categoryId: string = props.match.params.id;

  return {
    id: categoryId,
    category: state.entities.categories[categoryId] || {}
  };
};

const mapDispatchToProps = {
  getCategory: Actions.categories.getCategory
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(Category);
