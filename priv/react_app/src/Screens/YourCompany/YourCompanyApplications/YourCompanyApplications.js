import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash/fp';
import { Avatar, List } from 'antd';
import NotFound from '../../NotFound';
import HtmlTitle from '../../../Components/HtmlTitle';
import '../YourCompany.css';

class YourCompanyApplications extends Component {
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
        <HtmlTitle title='Applications' />
        <h3>Student Session applications</h3>
        <List
          dataSource={currentCompany.studentSessionApplications}
          bordered
          renderItem={({ id, motivation }) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar size="large">{id}</Avatar>}
                description={`Motivation: ${motivation}`}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default YourCompanyApplications;
