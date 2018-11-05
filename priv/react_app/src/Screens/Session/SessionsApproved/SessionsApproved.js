import React, { Component } from 'react';
import { sortBy } from 'lodash/fp';
import { Icon, List, Avatar, Button } from 'antd';
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
  end?: string
};
type Session = {
  id?: number,
  studentId: number,
  companyId: number,
  studentConfirmed?: boolean,
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
  confirmSession: number => Promise<void>,
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

  confirmSession = (id: ?number) => {
    const { confirmSession } = this.props;
    if (id) confirmSession(id);
  };

  renderSession = (session: Session) => (
    <List.Item
      actions={[
        session.studentConfirmed ? (
          <Icon type="check-circle" theme="filled" />
        ) : (
          <Button
            type="primary"
            onClick={() => this.confirmSession(session.id)}
          >
            Confirm
          </Button>
        )
      ]}
    >
      <List.Item.Meta
        title={session.company.name}
        description={this.renderTimeField(session.studentSessionTimeSlot)}
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

  renderTimeField = ({ start = '', end = '' }: TimeSlot) =>
    `Start: ${toSessionTimeFormat(start)}\nEnd: ${toSessionTimeFormat(end)}`;

  render() {
    const { sessions = [], fetching } = this.props;

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
          dataSource={sortBy('studentSessionTimeSlot.start', sessions )}
          renderItem={this.renderSession}
          locale={{ emptyText: 'No Sessions' }}
        />
      </div>
    );
  }
}

export default StudentSessions;
