import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isNil, filter } from 'lodash/fp';
import { List, Avatar } from 'antd';
import NotFound from '../NotFound';
import { toExternal } from '../../Util/URLHelper';
import LoadingSpinner from '../../Components/LoadingSpinner';
import HtmlTitle from '../../Components/HtmlTitle';
import InvisibleLink from '../../Components/InvisibleLink';

class SessionCompanies extends Component {
  componentWillMount() {
    const { getAllCompanies } = this.props;
    getAllCompanies();
  }

  renderCompany = ({ name, website, logoUrl, description }) => (
    <List.Item
      extra={
        <Avatar
          src={logoUrl}
          size={128}
          shape="square"
          alt="Company Logotype"
        />
      }
      actions={[
        <InvisibleLink to="/session/application">Apply now</InvisibleLink>
      ]}
    >
      <List.Item.Meta
        title={name}
        description={<a href={toExternal(website)}>{website}</a>}
      />
      {description}
    </List.Item>
  );

  render() {
    const { companies, fetching } = this.props;

    if (fetching) {
      return <LoadingSpinner />;
    }
    if (isNil(companies)) {
      return <NotFound />;
    }

    return (
      <div style={{ padding: 24 }}>
        <HtmlTitle title="Student Session Companies" />
        <h1>Student Session Companies</h1>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={filter('studentSessionDays', companies)}
          renderItem={this.renderCompany}
          style={{ whiteSpace: 'pre-wrap' }}
        />
      </div>
    );
  }
}

SessionCompanies.propTypes = {
  companies: PropTypes.object.isRequired
};

export default SessionCompanies;
