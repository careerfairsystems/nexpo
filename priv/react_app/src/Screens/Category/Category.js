import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash/fp';
import Table from 'antd/lib/table';
import Attribute from './Attribute';
import NotFound from '../NotFound';
import HtmlTitle from '../../Components/HtmlTitle';
import LoadingSpinner from '../../Components/LoadingSpinner';

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

    const dataSource = [
      {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street'
      },
      {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street'
      }
    ];

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
      }
    ];

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
            {category.attributes.map(id => <Attribute key={id} id={id} />)}
            <Table columns={columns} dataSource={dataSource} />
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
