import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'ramda';
import NotFound from '../NotFound';
import MailLink from '../../Components/MailLink';
import HtmlTitle from '../../Components/HtmlTitle';

/**
 * Responsible for rendering a category. Category id is recieved via url
 */
class Category extends Component {
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
          </div>
        </div>
      </div>
    );
  }
}

Category.propTypes = {
  category: PropTypes.object.isRequired
};

export default Category;
