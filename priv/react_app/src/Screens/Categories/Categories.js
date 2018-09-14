import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import InvisibleLink from '../../Components/InvisibleLink';
import LoadingSpinner from '../../Components/LoadingSpinner';
import HtmlTitle from '../../Components/HtmlTitle';

/**
 * Responsible for rendering a list of categories
 */
class Categories extends Component {
  componentWillMount() {
    this.props.getAllCategories();
  }

  _renderLoading() {
    return (
      <div className="loading-spinner">
        <LoadingSpinner />
      </div>
    );
  }

  _renderCategories() {
    const { categories } = this.props;

    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (title, { id }) => (
          <InvisibleLink to={`/categories/${id}`}>{title}</InvisibleLink>
        )
      },
      {
        title: 'Action',
        key: 'action',
        render: ({ id }) => (
          <span>
            <InvisibleLink to={`/categories/${id}`}>Show</InvisibleLink>
            <Divider type="vertical" />
            <InvisibleLink to="#">Edit</InvisibleLink>
            <Divider type="vertical" />
            <InvisibleLink to="#">Delete</InvisibleLink>
          </span>
        )
      }
    ];

    return (
      <div>
        <HtmlTitle title="Categories" />

        <Table
          dataSource={Object.keys(categories).map(i => ({
            ...categories[i],
            key: i
          }))}
          columns={columns}
        />

        <Button onClick={() => console.log('New category')} type="primary">
          New category
        </Button>
      </div>
    );
  }

  render() {
    if (this.props.fetching) {
      return this._renderLoading();
    }
    return this._renderCategories();
  }
}

Categories.propTypes = {
  categories: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired,
  getAllCategories: PropTypes.func.isRequired
};

Categories.defaultProps = {
  categories: {},
  fetching: false
};

export default Categories;
