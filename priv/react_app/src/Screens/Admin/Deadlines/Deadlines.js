import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Popconfirm, Divider } from 'antd';
import { sortBy } from 'lodash/fp';

import InvisibleLink from '../../../Components/InvisibleLink';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HtmlTitle from '../../../Components/HtmlTitle';

/**
 * Responsible for rendering a list of deadlines
 */
class Deadlines extends Component {
  static propTypes = {
    deadlines: PropTypes.object,
    fetching: PropTypes.bool.isRequired,
    getAllDeadlines: PropTypes.func.isRequired,
    deleteDeadline: PropTypes.func.isRequired
  };

  static defaultProps = {
    deadlines: {}
  };

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
        <InvisibleLink to={`/admin/deadlines/${id}`}>{name}</InvisibleLink>
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
      render: deadline => {
        const { deleteDeadline } = this.props;
        return (
          <span>
            <InvisibleLink to={`/admin/deadlines/${deadline.id}`}>
              Edit
            </InvisibleLink>
            <Divider type="vertical" />
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => deleteDeadline(deadline.id)}
            >
              <span style={{ color: '#ff4d4f', cursor: 'pointer' }}>
                Delete
              </span>
            </Popconfirm>
          </span>
        );
      }
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
    const { fetching } = this.props;
    if (fetching) {
      return <LoadingSpinner />;
    }
    return this.renderDeadlines();
  }
}

export default Deadlines;
