import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash/fp';
import Attributes from './Attributes';
import NotFound from '../../NotFound';
import HtmlTitle from '../../../Components/HtmlTitle';

/**
 * Responsible for rendering a category. Category id is recieved via url
 */
class Category extends Component {
  componentWillMount() {
    const { id, getCategory } = this.props;
    getCategory(id);
  }

  render() {
    const { category } = this.props;

    if (isEmpty(category) || isNil(category)) {
      return <NotFound />;
    }

    const { title } = category;
    return (
      <div className="Category_Component">
        <HtmlTitle title={title} />

        <div className="left-col">
          <div className="paper main-info">
            <h1>{title}</h1>
          </div>

          <div className="paper categories">
            <h2>Attributes</h2>
            <Attributes ids={category.attributes} />
          </div>
        </div>
      </div>
    );
  }
}

Category.propTypes = {
  id: PropTypes.string.isRequired,
  category: PropTypes.object.isRequired,
  getCategory: PropTypes.func.isRequired
};

export default Category;
