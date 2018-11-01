import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil, sortBy } from 'lodash/fp';
import { Avatar, List, Tag } from 'antd';
import { toDayFormat } from '../../../Util/FormatHelper';
import NotFound from '../../NotFound';
import HtmlTitle from '../../../Components/HtmlTitle';
import '../YourCompany.css';

class YourCompanyTimeSlots extends Component {
  static propTypes = {
    currentCompany: PropTypes.object.isRequired,
    getCurrentCompany: PropTypes.func.isRequired
  };

  componentWillMount() {
    const { getCurrentCompany } = this.props;
    getCurrentCompany();
  }

  render() {
    const { currentCompany } = this.props;

    if (isEmpty(currentCompany) || isNil(currentCompany)) return <NotFound />;

    const studentConfirmed = studentSession => {
      if (studentSession) {
        return studentSession.studentConfirmed ? 'Confirmed' : 'Not Confirmed';
      }
      return 'Not assigned';
    };
    const studentConfirmedColor = studentSession => {
      if (studentSession) {
        return studentSession.studentConfirmed ? 'green' : 'gold';
      }
      return 'red';
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
          dataSource={sortBy('start', currentCompany.studentSessionTimeSlots)}
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
              <Tag color={studentConfirmedColor(studentSession)}>
                {studentConfirmed(studentSession)}
              </Tag>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default YourCompanyTimeSlots;
