import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash/fp';
import { Avatar, List, Table } from 'antd';
import { toDayFormat } from '../../../Util/FormatHelper';
import NotFound from '../../NotFound';
import HtmlTitle from '../../../Components/HtmlTitle';
import '../YourCompany.css';

class YourCompanySchedule extends Component {
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

    // const { name } = currentCompany;
    const dataSource = [
      {
        key: '1',
        name: 'Mike',
        age: 32,
        location: '10 Downing Street',
        startTime: '2018-06-06 11:00',
        endTime: '2018-06-06 12:00'
      },
      {
        key: '2',
        name: 'John',
        age: 42,
        location: '10 Downing Street',
        startTime: '2018-06-07 11:00',
        endTime: '2018-06-07 12:00'
      }
    ];

    const columns = [
      {
        title: 'Start time',
        dataIndex: 'start',
        key: 'start'
      },
      {
        title: 'End time',
        dataIndex: 'end',
        key: 'end'
      },
      {
        title: 'Name of the student',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location'
      }
    ];
    return (
      <div className="company-show-view">
        <HtmlTitle title="TimeSlots" />
        <h3>Student Session Time Slots</h3>
        <List
          dataSource={currentCompany.studentSessionTimeSlots}
          bordered
          renderItem={({ id, start, end, location }) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar size="large">{id}</Avatar>}
                title={`Location: ${location}`}
                description={`Start Time: ${toDayFormat(
                  start
                )}\nEnd Time: ${toDayFormat(end)}`}
              />
            </List.Item>
          )}
        />
        <Table
          dataSource={currentCompany.studentSessionTimeSlots}
          columns={columns}
        />
      </div>
    );
  }
}

export default YourCompanySchedule;
