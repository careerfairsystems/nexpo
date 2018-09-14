import { connect } from 'react-redux';
import Category from './Category';

const stateful = connect((state, props) => {
  const categoryId = props.match.params.id;
  return {
    category: state.entities.categories[categoryId] || {}
  };
});

export default stateful(Category);
