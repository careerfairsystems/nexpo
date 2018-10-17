import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isNil, sortBy } from 'lodash/fp';
import { List, Avatar, Popconfirm, Button } from 'antd';
import NotFound from '../../NotFound';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HtmlTitle from '../../../Components/HtmlTitle';
import {
  toDayFormat,
  StudentSessionTimeFormat
} from '../../../Util/FormatHelper';

import '../Session.css';

class StudentSessions extends Component {
  static propTypes = {
    sessions: PropTypes.array,
    companies: PropTypes.object,
    getAllCompanies: PropTypes.func.isRequired,
    destroyStudentSessionAppl: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    updateStudentSessionAppl: PropTypes.func.isRequired
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

  renderSession = session => {
    const { destroyStudentSessionAppl } = this.props;
    return (
      <List.Item
        actions={[
          <Button
            type="primary"
            onClick={() => this.confirmSession(session.id)}
          >
            Confirm
          </Button>
        ]}
      >
        <List.Item.Meta
          title={this.getCompany(session).name}
          description={this.renderTimeField(session.start, session.end)}
          avatar={
            <Avatar
              src={this.getCompany(session).logoUrl}
              size={128}
              shape="square"
              alt="Company Logotype"
            />
          }
        />
      </List.Item>
    );
  };

  renderTimeField = (start, end) =>
    `Start: ${StudentSessionTimeFormat(start)}\nEnd: ${StudentSessionTimeFormat(
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
      <div className="session-applications">
        <HtmlTitle title="Student Session" />
        <h1>Student Sessions</h1>
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
