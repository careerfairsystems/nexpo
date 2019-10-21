import React, { Component } from 'react';
import { isEmpty, isNil, sortBy } from 'lodash/fp';
import { Avatar, List, Tag } from 'antd';
import { toDayFormat } from '../../../Util/FormatHelper';
import NotFound from '../../NotFound';
import HtmlTitle from '../../../Components/HtmlTitle';
import '../YourCompany.css';

const statusLabel = [
  { text: 'Unanswered', color: 'gold' },
  { text: 'Confirmed', color: 'green' },
  { text: 'Declined', color: 'red' }
];

type Props = {
  currentCompany: {
    studentSessionDays?: number,
    studentSessionTimeSlots?: {
      start: string,
      end: string,
      location: string
    },
    name?: string,
    description?: string,
    website?: string,
    logoUrl?: string
  },
  getCurrentCompany: () => Promise<void>
};
class YourCompanyTimeSlots extends Component<Props> {
  componentWillMount() {
    const { getCurrentCompany } = this.props;
    getCurrentCompany();
  }

  render() {
    const { currentCompany } = this.props;

    if (isEmpty(currentCompany) || isNil(currentCompany)) return <NotFound />;

    const studentSessionStatus = studentSession => {
      if (studentSession) {
        return statusLabel[studentSession.studentSessionStatus].text;
      }
      return 'Not assigned';
    };
    const studentSessionStatusColor = studentSession => {
      if (studentSession) {
        return statusLabel[studentSession.studentSessionStatus].color;
      }
      return 'blue';
    };
    const studentInfo = ({ student: { user } }) => (
      <>
        Name: {[user.firstName, user.lastName].join(' ')}
        <br />
        Email: {user.email}
        <br />
      </>
    );

    return (
      <div className="company-show-view">
        <HtmlTitle title="TimeSlots" />
        <h3>Student Session Time Slots</h3>
        <List
          itemLayout="vertical"
          dataSource={sortBy(
            'start',
            currentCompany.studentSessionTimeSlots || []
          )}
          bordered
          renderItem={({ start, end, location, studentSession }, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar size="large">{index + 1}</Avatar>}
                title={`Location: ${location}`}
                description={`Start Time: ${toDayFormat(
                  start
                )}\nEnd Time: ${toDayFormat(end)}`}
              />
              {studentSession && studentInfo(studentSession)}
              Student:{' '}
              <Tag color={studentSessionStatusColor(studentSession)}>
                {studentSessionStatus(studentSession)}
              </Tag>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default YourCompanyTimeSlots;
