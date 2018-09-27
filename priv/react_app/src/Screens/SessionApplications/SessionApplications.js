import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash/fp';
import { List, Avatar } from 'antd';
import NotFound from '../NotFound';
import LoadingSpinner from '../../Components/LoadingSpinner';
import HtmlTitle from '../../Components/HtmlTitle';

class SessionApplication extends Component {
  componentWillMount() {
    const { getAllCompanies } = this.props;
    getAllCompanies();
  }

  getStyle = ({ companyApproved }) => ({
    backgroundColor: companyApproved ? '#87d068' : '#002B64'
  });

  getCompany = ({ company }) => this.props.companies[company];

  renderApplication = application => (
    <List.Item>
      <List.Item.Meta
        title={this.getCompany(application).name}
        description={`Motivation: ${application.motivation}`}
        avatar={<Avatar icon="mail" style={this.getStyle(application)} />}
      />
    </List.Item>
  );

  render() {
    const { applications, companies, fetching } = this.props;

    if (fetching) {
      return <LoadingSpinner />;
    }
    if (isEmpty(applications)) {
      return <NotFound />;
    }

    return (
      <div style={{ padding: 24 }}>
        <HtmlTitle title="Student Session Application" />
        <h1>Student Session Applications</h1>
        <List
          size="large"
          bordered
          dataSource={applications}
          renderItem={this.renderApplication}
        />
      </div>
    );
  }
}

SessionApplication.propTypes = {
  applications: PropTypes.array.isRequired
};

export default SessionApplication;
