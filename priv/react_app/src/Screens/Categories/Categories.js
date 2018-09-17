import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { denormalize } from 'normalizr';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import Schema from '../../Store/normalizr/schema';
import InvisibleLink from '../../Components/InvisibleLink';
import LoadingSpinner from '../../Components/LoadingSpinner';
import HtmlTitle from '../../Components/HtmlTitle';

const setKeys = entries =>
  Object.keys(entries).map(i => ({
    ...entries[i],
    key: i
  }));

const categoryColumns = [
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
    render: category => (
      <span>
        <InvisibleLink to={`/categories/${category.id}`}>Show</InvisibleLink>
        <Divider type="vertical" />
        <InvisibleLink to="#">Edit</InvisibleLink>
        <Divider type="vertical" />
        <InvisibleLink to="#">Delete</InvisibleLink>
      </span>
    )
  }
];

const attributeColumns = [
  { title: 'Title', dataIndex: 'title', key: 'title' },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <span>
        <InvisibleLink to="#">Show</InvisibleLink>
        <Divider type="vertical" />
        <InvisibleLink to="#category-edit">Edit</InvisibleLink>
        <Divider type="vertical" />
        <InvisibleLink to="#category-delete">Delete</InvisibleLink>
      </span>
    )
  }
];

const expandedRowRender = attributes => category => (
  <Table
    columns={attributeColumns}
    dataSource={setKeys(
      denormalize(
        { attributes: category.attributes },
        Schema.categorySchema(),
        {
          attributes
        }
      ).attributes
    )}
    showHeader={false}
    pagination={false}
  />
);

/**
 * Responsible for rendering a list of categories
 */
class Categories extends Component {
  componentWillMount() {
    const { getAllCategories } = this.props;
    getAllCategories();
  }

  renderCategories() {
    const { categories, attributes } = this.props;

    return (
      <div>
        <HtmlTitle title="Categories" />

        <h1>Categories</h1>

        <Table
          columns={categoryColumns}
          dataSource={setKeys(categories)}
          expandedRowRender={expandedRowRender(attributes)}
          expandRowByClick
        />
        <Button onClick={() => null} type="primary">
          New category
        </Button>
      </div>
    );
  }

  render() {
    if (this.props.fetching) {
      return <LoadingSpinner />;
    }
    return this.renderCategories();
  }
}

Categories.defaultProps = {
  attributes: []
};

Categories.propTypes = {
  categories: PropTypes.object.isRequired,
  attributes: PropTypes.object,
  fetching: PropTypes.bool.isRequired,
  getAllCategories: PropTypes.func.isRequired
};

Categories.defaultProps = {
  categories: {},
  fetching: false
};

export default Categories;
