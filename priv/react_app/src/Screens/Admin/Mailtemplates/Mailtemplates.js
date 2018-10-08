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
 * Responsible for rendering a list of mailtemplates
 */
class Mailtemplates extends Component {
  componentWillMount() {
    const { getAllMailtemplates } = this.props;
    getAllMailtemplates();
  }

  mailtemplateColumns = () => [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, { id }) => (
        <InvisibleLink to={`/admin/mailtemplates/${id}`}>{name}</InvisibleLink>
      )
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject'
    },
    {
      title: 'Signature',
      dataIndex: 'signature',
      key: 'signature'
    },
    {
      title: 'Action',
      key: 'action',
      render: mailtemplate => (
        <span>
          <InvisibleLink to={`/admin/mailtemplates/${mailtemplate.id}`}>
            Edit
          </InvisibleLink>
          <Divider type="vertical" />
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => this.props.deleteMailtemplate(mailtemplate.id)}
          >
            <span style={{ color: '#ff4d4f', cursor: 'pointer' }}>Delete</span>
          </Popconfirm>
        </span>
      )
    }
  ];

  renderMailtemplates() {
    const { mailtemplates } = this.props;

    return (
      <div>
        <HtmlTitle title="Mailtemplates" />

        <h1>Mailtemplates</h1>

        <Table
          columns={this.mailtemplateColumns()}
          dataSource={sortBy(
            'name',
            Object.keys(mailtemplates).map(i => ({
              ...mailtemplates[i],
              key: i
            }))
          )}
        />
        <InvisibleLink to="/mailtemplates/new">
          <Button onClick={() => null} type="primary">
            New mailtemplate
          </Button>
        </InvisibleLink>
      </div>
    );
  }

  render() {
    if (this.props.fetching) {
      return <LoadingSpinner />;
    }
    return this.renderMailtemplates();
  }
}

Mailtemplates.propTypes = {
  mailtemplates: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired,
  getAllMailtemplates: PropTypes.func.isRequired
};

Mailtemplates.defaultProps = {
  mailtemplates: {},
  fetching: false
};

export default Mailtemplates;
