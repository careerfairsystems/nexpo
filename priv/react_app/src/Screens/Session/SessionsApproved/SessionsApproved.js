import React, { Component } from 'react';
import { sortBy } from 'lodash/fp';
import { List, Avatar, Button, Popconfirm } from 'antd';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HtmlTitle from '../../../Components/HtmlTitle';
import { toSessionTimeFormat } from '../../../Util/FormatHelper';

import '../Session.css';

type Company = {
  name: string,
  logoUrl: string
};
type TimeSlot = {
  start?: string,
  end?: string,
  location?: string
};
type Session = {
  id: number,
  studentId: number,
  companyId: number,
  studentSessionStatus: number,
  company: Company,
  studentSessionTimeSlot: TimeSlot
};
type Props = {
  sessions?: ?Array<Session>,
  companies?: {
    id?: string,
    name?: string,
    description?: string,
    website?: string
  },
  updateSession: (id: number, status: number) => Promise<void>,
  getAllCompanies: () => Promise<void>,
  fetching: boolean
};
class StudentSessions extends Component<Props> {
  static defaultProps = {
    companies: {},
    sessions: []
  };

  componentWillMount() {
    const { getAllCompanies } = this.props;
    getAllCompanies();
  }

  updateSession = (id: number, status: number) => {
    const { updateSession } = this.props;
    if (id) updateSession(id, status);
  };

  sessionStatusView(session: Session) {
    if (session.studentSessionStatus === 2) {
      return (
        <div>
          <p style={{ color: 'red' }}>Declined</p>
        </div>
      );
    }
    if (session.studentSessionStatus === 1) {
      return this.sessionConfirmed(session);
    }
    return this.sessionUnanswered(session);
  }

  sessionUnanswered(session: Session) {
    return (
      <div>
        <div>
          <Button
            className="sessionButton"
            type="primary"
            onClick={() => this.updateSession(session.id, 1)}
          >
            Confirm
          </Button>
        </div>
        <div>
          <Popconfirm
            placement="left"
            title="You cannot edit your response after declining"
            onConfirm={() => this.updateSession(session.id, 2)}
          >
            <Button type="danger">Decline</Button>
          </Popconfirm>
        </div>
      </div>
    );
  }

  sessionConfirmed(session: Session) {
    return (
      <div>
        <div>
          <p style={{ color: 'green' }}>Confirmed</p>
        </div>
        <div>
          <Popconfirm
            placement="left"
            title="You cannot edit your response after declining"
            onConfirm={() => this.updateSession(session.id, 2)}
          >
            <Button type="danger">Decline</Button>
          </Popconfirm>
        </div>
      </div>
    );
  }

  renderSession = (session: Session) => (
    <List.Item actions={[this.sessionStatusView(session)]}>
      <List.Item.Meta
        title={session.company.name}
        description={this.renderDescription(session.studentSessionTimeSlot)}
        avatar={
          <Avatar
            src={session.company.logoUrl}
            size={128}
            shape="square"
            alt="Company Logotype"
          />
        }
      />
    </List.Item>
  );

  renderDescription = ({
    start = '',
    end = '',
    location = 'Not defined'
  }: TimeSlot) => `${toSessionTimeFormat(start, end)}\nLocation: ${location}`;

  render() {
    const { sessions, fetching } = this.props;

    if (fetching) {
      return <LoadingSpinner />;
    }

    return (
      <div className="sessions-approved">
        <HtmlTitle title="Student Session" />
        <h1>Student Sessions</h1>
        <h4>
          The time slots found on this page is the student sessions you have
          been approved for. You have to confirm all the slots that you would
          like to keep, otherwise, the slot will be given to another student.
        </h4>
        <List
          size="large"
          bordered
          dataSource={sortBy('studentSessionTimeSlot.start', sessions || [])}
          renderItem={this.renderSession}
          locale={{ emptyText: 'No Sessions' }}
        />
      </div>
    );
  }
}

export default StudentSessions;
