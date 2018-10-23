import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash/fp';
import { Avatar, List } from 'antd';
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

    // const { name } = currentCompany;
    return (
      <div className="company-show-view">
        <HtmlTitle title='TimeSlots' />
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
      </div>
    );
  }
}

export default YourCompanyTimeSlots;
