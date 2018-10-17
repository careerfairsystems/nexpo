import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Divider, Popconfirm } from 'antd';

import InvisibleLink from '../../../Components/InvisibleLink';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HtmlTitle from '../../../Components/HtmlTitle';

/**
 * Responsible for rendering a list of programmes
 */
class Programmes extends Component {
  static propTypes = {
    programmes: PropTypes.object,
    fetching: PropTypes.bool.isRequired,
    deleteProgramme: PropTypes.func.isRequired,
    getAllProgrammes: PropTypes.func.isRequired
  };

  static defaultProps = {
    programmes: {}
  };

  componentWillMount() {
    const { getAllProgrammes } = this.props;
    getAllProgrammes();
  }

  programmeColumns = () => [
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
      render: programme => {
        const { deleteProgramme } = this.props;
        return (
          <span>
            <InvisibleLink to={`/admin/programme/${programme.id}`}>
              Edit
            </InvisibleLink>
            <Divider type="vertical" />
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => deleteProgramme(programme.id)}
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

  renderProgrammes() {
    const { programmes } = this.props;

    return (
      <div>
        <HtmlTitle title="Programmes" />

        <h1>Programmes</h1>

        <Table
          columns={this.programmeColumns()}
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
    const { fetching } = this.props;
    if (fetching) {
      return <LoadingSpinner />;
    }
    return this.renderProgrammes();
  }
}

export default Programmes;
