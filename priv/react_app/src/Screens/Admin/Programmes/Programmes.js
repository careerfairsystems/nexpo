import React, { Component } from 'react';
import { Table, Button, Divider, Popconfirm } from 'antd';

import InvisibleLink from '../../../Components/InvisibleLink';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HtmlTitle from '../../../Components/HtmlTitle';

/**
 * Responsible for rendering a list of programmes
 */
type Props = {
  programmes?: {},
  fetching: boolean,
  deleteProgramme: string => Promise<void>,
  getAllProgrammes: () => Promise<void>
};
class Programmes extends Component<Props> {
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
      render: (name: string, { id }: { id: string }) => (
        <InvisibleLink to={`/admin/programmes/${id}`}>{name}</InvisibleLink>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (programme: { id: string }) => {
        const { deleteProgramme } = this.props;
        return (
          <span>
            <InvisibleLink to={`/admin/programmes/${programme.id}`}>
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
    const { programmes = {} } = this.props;

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

        <InvisibleLink to="/admin/programmes/new">
          <Button onClick={() => null} type="primary">
            New programme
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
    return this.renderProgrammes();
  }
}

export default Programmes;
