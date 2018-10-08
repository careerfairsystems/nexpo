import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Button } from 'antd';
import { sortBy } from 'lodash/fp';
import Popconfirm from 'antd/lib/popconfirm';
import Divider from 'antd/lib/divider';
import InvisibleLink from '../../../Components/InvisibleLink';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HtmlTitle from '../../../Components/HtmlTitle';

/**
 * Responsible for rendering a list of deadlines
 */
class Deadlines extends Component {
  componentWillMount() {
    const { getAllDeadlines } = this.props;
    getAllDeadlines();
  }

  deadlineColumns = () => [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, { id }) => (
        <InvisibleLink to={`/deadlines/${id}`}>{name}</InvisibleLink>
      )
    },
    {
      title: 'Start',
      dataIndex: 'start',
      key: 'start'
    },
    {
      title: 'End',
      dataIndex: 'end',
      key: 'end'
    },
    {
      title: 'Action',
      key: 'action',
      render: deadline => (
        <span>
          <InvisibleLink to={`/deadlines/${deadline.id}`}>Edit</InvisibleLink>
          <Divider type="vertical" />
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => this.props.deleteDeadline(deadline.id)}
          >
            <span style={{ color: '#ff4d4f', cursor: 'pointer' }}>Delete</span>
          </Popconfirm>
        </span>
      )
    }
  ];

  renderDeadlines() {
    const { deadlines } = this.props;

    return (
      <div>
        <HtmlTitle title="Deadlines" />

        <h1>Deadlines</h1>

        <Table
          columns={this.deadlineColumns()}
          dataSource={sortBy(
            'name',
            Object.keys(deadlines).map(i => ({
              ...deadlines[i],
              key: i
            }))
          )}
        />
        <InvisibleLink to="/deadlines/new">
          <Button onClick={() => null} type="primary">
            New deadline
          </Button>
        </InvisibleLink>
      </div>
    );
  }

  render() {
    if (this.props.fetching) {
      return <LoadingSpinner />;
    }
    return this.renderDeadlines();
  }
}

Deadlines.propTypes = {
  deadlines: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired,
  getAllDeadlines: PropTypes.func.isRequired
};

Deadlines.defaultProps = {
  deadlines: {},
  fetching: false
};

export default Deadlines;
