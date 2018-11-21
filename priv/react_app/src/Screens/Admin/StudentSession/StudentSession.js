import React, { Component } from 'react';
import { Button, Popconfirm } from 'antd';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HtmlTitle from '../../../Components/HtmlTitle';

import API from '../../../API';

/**
 * Responsible for rendering a list of companies
 */
type Props = {
  companies?: {},
  fetching: boolean,
  createBulkStudentSessions: () => Promise<void>
};
class StudentSession extends Component<Props> {
  static defaultProps = {
    companies: {}
  };

  renderCompanies() {
    return (
      <div>
        <HtmlTitle title="StudentSession" />

        <h1>Student Session</h1>
        <Popconfirm
          title="Sure to assign empty and non-confirmed time slots?"
          onConfirm={() => {
            const { createBulkStudentSessions } = this.props;
            createBulkStudentSessions();
          }}
        >
          <Button onClick={() => null}>Assign all</Button>
        </Popconfirm>
        <br />
        <Popconfirm
          title="Sure to delete all non confirmed student sessions?"
          onConfirm={API.studentSessions.deleteNonConfirmed}
        >
          <Button onClick={() => null}>Remove non-confirmed sessions</Button>
        </Popconfirm>
        <br />
        <Button icon="download" onClick={API.studentSessions.downloadReserves}>
          Download reserves
        </Button>
      </div>
    );
  }

  render() {
    const { fetching } = this.props;

    if (fetching) {
      return <LoadingSpinner />;
    }
    return this.renderCompanies();
  }
}

export default StudentSession;
