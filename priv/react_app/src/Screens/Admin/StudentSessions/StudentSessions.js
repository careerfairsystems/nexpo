import React from 'react';
import { Button, Popconfirm } from 'antd';
import HtmlTitle from '../../../Components/HtmlTitle';

import API from '../../../API';

type Props = {
  createBulkStudentSessions: () => Promise<void>
};

const StudentSessions = ({ createBulkStudentSessions }: Props) => (
  <div>
    <HtmlTitle title="StudentSessions" />

    <h1>Student Session</h1>
    <Popconfirm
      title="Sure to assign empty and non-confirmed time slots?"
      onConfirm={createBulkStudentSessions}
    >
      <Button onClick={() => null}>Assign all</Button>
    </Popconfirm>
    <br />
    <br />
    <Popconfirm
      title="Sure to delete all non confirmed student sessions?"
      onConfirm={API.studentSessions.deleteNonConfirmed}
    >
      <Button onClick={() => null}>Remove non-confirmed sessions</Button>
    </Popconfirm>
    <br />
    <br />
    <Button icon="download" onClick={API.studentSessions.downloadReserves}>
      Download reserves
    </Button>
    <br />
    <br />
    <Button
      icon="download"
      onClick={API.studentSessions.downloadSessionInformation}
    >
      Download student sessions information
    </Button>
  </div>
);

export default StudentSessions;
