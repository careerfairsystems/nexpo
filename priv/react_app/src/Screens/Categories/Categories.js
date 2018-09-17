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

    const expandedRowRender = category => (
      <Table
        columns={[
          { title: 'Title', dataIndex: 'title', key: 'title' },
          {
            title: 'Action',
            key: 'action',
            render: () => (
              <span>
                <InvisibleLink to="#">Show</InvisibleLink>
                <Divider type="vertical" />
                <InvisibleLink to="#">Edit</InvisibleLink>
                <Divider type="vertical" />
                <InvisibleLink to="#">Delete</InvisibleLink>
              </span>
            )
          }
        ]}
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

    return (
      <div>
        <HtmlTitle title="Categories" />

        <h1>Categories</h1>

        <Table
          columns={columns}
          dataSource={setKeys(categories)}
          expandedRowRender={expandedRowRender}
          expandRowByClick
        />
        <Button onClick={() => console.log('New category')} type="primary">
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
