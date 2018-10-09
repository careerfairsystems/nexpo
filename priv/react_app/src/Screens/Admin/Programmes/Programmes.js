import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import InvisibleLink from '../../../Components/InvisibleLink';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HtmlTitle from '../../../Components/HtmlTitle';

const programmeColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name, { id }) => (
      <InvisibleLink to={`/admin/programmes/${id}`}>{name}</InvisibleLink>
    )
  },
  {
    title: 'Action',
    key: 'action',
    render: programme => (
      <span>
        <InvisibleLink to={`/admin/programmes/${programme.id}`}>Show</InvisibleLink>
        <Divider type="vertical" />
        <InvisibleLink to="#programme-edit">Edit</InvisibleLink>
        <Divider type="vertical" />
        <InvisibleLink to="#programme-delete">Delete</InvisibleLink>
      </span>
    )
  }
];

/**
 * Responsible for rendering a list of programmes
 */
class Programmes extends Component {
  componentWillMount() {
    const { getAllProgrammes } = this.props;
    getAllProgrammes();
  }

  renderProgrammes() {
    const { programmes } = this.props;

    return (
      <div>
        <HtmlTitle title="Programmes" />

        <h1>Programmes</h1>

        <Table
          columns={programmeColumns}
          dataSource={Object.keys(programmes).map(i => ({
            ...programmes[i],
            key: i
          }))}
        />

        <Button onClick={() => null} type="primary">
          New programme
        </Button>
      </div>
    );
  }

  render() {
    if (this.props.fetching) {
      return <LoadingSpinner />;
    }
    return this.renderProgrammes();
  }
}

Programmes.propTypes = {
  programmes: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired,
  getAllProgrammes: PropTypes.func.isRequired
};

Programmes.defaultProps = {
  programmes: {},
  fetching: false
};

export default Programmes;
