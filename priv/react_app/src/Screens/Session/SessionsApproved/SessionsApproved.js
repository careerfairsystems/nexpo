import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isNil, sortBy } from 'lodash/fp';
import { Icon, List, Avatar, Button } from 'antd';
import NotFound from '../../NotFound';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HtmlTitle from '../../../Components/HtmlTitle';
import { studentSessionTimeFormat } from '../../../Util/FormatHelper';

import '../Session.css';

class StudentSessions extends Component {
  static propTypes = {
    sessions: PropTypes.arrayOf(
      PropTypes.shape({
        studentId: PropTypes.number,
        companyId: PropTypes.number,
        studentConfirmed: PropTypes.bool,
        start: PropTypes.string,
        end: PropTypes.string
      })
    ),
    companies: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      website: PropTypes.string
    }),
    confirmSession: PropTypes.func.isRequired,
    getAllCompanies: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired
  };

  static defaultProps = {
    companies: {},
    sessions: null
  };

  componentWillMount() {
    const { getAllCompanies } = this.props;
    getAllCompanies();
  }

  getCompany = ({ company }) => {
    const { companies } = this.props;
    return companies[company] || {};
  };

  confirmSession = id => {
    const { confirmSession } = this.props;
    confirmSession(id);
  };

  renderSession = session => (
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
        title={this.getCompany(session).name}
        description={this.renderTimeField(
          session.start,
          session.end,
          session.studentConfirmed
        )}
        avatar={
          <Avatar
            src={this.getCompany(session).logoUrl}
            size={128}
            shape="square"
            alt="Company Logotype"
          />
        }
      />
      {session.studentConfirmed && <Icon type="check-circle" theme="filled" />}
    </List.Item>
  );

  renderTimeField = (start, end) =>
    `Start: ${studentSessionTimeFormat(start)}\nEnd: ${studentSessionTimeFormat(
      end
    )}`;

  render() {
    const { sessions, fetching } = this.props;

    if (fetching) {
      return <LoadingSpinner />;
    }

    if (isNil(sessions)) {
      return <NotFound />;
    }

    return (
      <div className="student-sessions">
        <HtmlTitle title="Student Session" />
        <h1>Student Sessions</h1>
        <h4>
          The time slots found on this page is the student sessions you have
          been approved. You have to approve all the slots that you would like
          to keep, otherwise, the slot will be given to another student.
        </h4>
        <List
          size="large"
          bordered
          dataSource={sortBy(appl => this.getCompany(appl).name, sessions)}
          renderItem={this.renderSession}
          locale={{ emptyText: 'No Applications' }}
        />
      </div>
    );
  }
}

export default StudentSessions;
