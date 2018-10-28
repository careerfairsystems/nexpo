import React, { Component } from 'react';
import { isNil, sortBy } from 'lodash/fp';
import { Icon, List, Avatar, Button } from 'antd';
import NotFound from '../../NotFound';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HtmlTitle from '../../../Components/HtmlTitle';
import { toSessionTimeFormat } from '../../../Util/FormatHelper';

import '../Session.css';

type SessionObj = {
  id?: number,
  studentId: number,
  companyId: number,
  studentConfirmed?: boolean,
  start?: string,
  end?: string
};
type Props = {
  sessions?: ?Array<SessionObj>,
  companies?: {
    id?: string,
    name?: string,
    description?: string,
    website?: string
  },
  confirmSession: number => Promise<any>,
  getAllCompanies: () => Promise<any>,
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

  getCompany = (companyId: number) => {
    const { companies = {} } = this.props;

    return companies[`${companyId}`] || {};
  };

  confirmSession = (id: ?number) => {
    const { confirmSession } = this.props;
    if (id) confirmSession(id);
  };

  renderSession = (session: SessionObj) => (
    <List.Item
      actions={[
        !session.studentConfirmed && (
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
        title={this.getCompany(session.companyId).name}
        description={this.renderTimeField(session.start, session.end)}
        avatar={
          <Avatar
            src={this.getCompany(session.companyId).logoUrl}
            size={128}
            shape="square"
            alt="Company Logotype"
          />
        }
      />
      {session.studentConfirmed && <Icon type="check-circle" theme="filled" />}
    </List.Item>
  );

  renderTimeField = (start: ?string = '', end: ?string = '') =>
    `Start: ${toSessionTimeFormat(start)}\nEnd: ${toSessionTimeFormat(end)}`;

  render() {
    const { sessions, fetching } = this.props;

    if (fetching) {
      return <LoadingSpinner />;
    }

    if (isNil(sessions)) {
      return <NotFound />;
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
          dataSource={sortBy(
            appl => this.getCompany(appl.companyId).name,
            sessions || []
          )}
          renderItem={this.renderSession}
          locale={{ emptyText: 'No Sessions' }}
        />
      </div>
    );
  }
}

export default StudentSessions;
