import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'lodash/fp';
import { List, Avatar, Popconfirm, Button } from 'antd';
import NotFound from '../NotFound';
import LoadingSpinner from '../../Components/LoadingSpinner';
import HtmlTitle from '../../Components/HtmlTitle';
import UpdateSessionApplicationForm from '../../Components/Forms/UpdateSessionApplicationForm';

class SessionApplications extends Component {
  constructor(props) {
    super(props);
    this.state = { editing: {} };
  }

  componentWillMount() {
    const { getAllCompanies } = this.props;
    getAllCompanies();
  }

  getCompany = ({ company }) => this.props.companies[company] || {};

  toggleEditMode = id => {
    const { editing } = this.state;
    editing[id] = !editing[id];
    this.setState({ editing });
  };

  updateStudentSessionAppl = values => {
    const { updateStudentSessionAppl } = this.props;
    console.log(values);
  };

  renderApplication = application => (
    <List.Item
      actions={[
        <Button
          onClick={() => this.toggleEditMode(application.id)}
          style={{ color: '#40a9ff', cursor: 'pointer' }}
        >
          {this.state.editing[application.id] ? 'Cancel' : 'Edit'}
        </Button>,
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => this.props.destroyStudentSessionAppl(application.id)}
        >
          <span style={{ color: '#ff4d4f', cursor: 'pointer' }}>Delete</span>
        </Popconfirm>
      ]}
    >
      <List.Item.Meta
        title={this.getCompany(application).name}
        description={this.renderMotivationField(
          application.motivation,
          application.id
        )}
        avatar={
          <Avatar
            src={this.getCompany(application).logoUrl}
            size={128}
            shape="square"
            alt="Company Logotype"
          />
        }
      />
    </List.Item>
  );

  renderMotivationField = (motivation, id) => {
    const { editing } = this.state;
    if (editing[id])
      return (
        <UpdateSessionApplicationForm
          initialValues={{ motivation }}
          onSubmit={this.updateStudentSessionAppl}
        />
      );
    return `Motivation: ${motivation}`;
  };

  render() {
    const { applications, fetching } = this.props;

    if (fetching) {
      return <LoadingSpinner />;
    }
    if (isNil(applications)) {
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
          locale={{ emptyText: 'No Applications' }}
        />
      </div>
    );
  }
}

SessionApplications.propTypes = {
  applications: PropTypes.array.isRequired,
  getAllCompanies: PropTypes.func.isRequired,
  destroyStudentSessionAppl: PropTypes.func.isRequired
};

export default SessionApplications;
