import React, { Component } from 'react';
import { isNil, sortBy } from 'lodash/fp';
import { List, Avatar, Popconfirm, Button } from 'antd';
import NotFound from '../../NotFound';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HtmlTitle from '../../../Components/HtmlTitle';
import UpdateSessionApplicationForm from '../../../Forms/UpdateSessionApplicationForm';
import '../Session.css';

type Application = {
  id: string,
  company: string,
  motivation: string
};
type Props = {
  applications?: ?Array<Application>,
  companies?: {},
  getAllCompanies: () => Promise<void>,
  destroyStudentSessionAppl: string => Promise<void>,
  fetching: boolean,
  updateStudentSessionAppl: (
    string,
    { studentSessionApplication: Application }
  ) => Promise<void>
};
type State = {
  editing: { [string]: boolean }
};
class SessionApplications extends Component<Props, State> {
  static defaultProps = {
    companies: {},
    applications: []
  };

  constructor(props: Props) {
    super(props);
    this.state = { editing: {} };
  }

  componentWillMount() {
    const { getAllCompanies } = this.props;
    getAllCompanies();
  }

  getCompany = (id: string) => {
    const { companies = {} } = this.props;
    return companies[id] || {};
  };

  toggleEditMode = (id: string) => {
    const { editing: stateEditing } = this.state;
    const editing = {};
    editing[id] = !stateEditing[id];
    this.setState({ editing });
  };

  updateStudentSessionAppl = (id: string, values: Application) => {
    const { updateStudentSessionAppl } = this.props;
    updateStudentSessionAppl(id, { studentSessionApplication: values });
    this.setState({ editing: {} });
  };

  renderApplication = (application: Application) => {
    const { editing } = this.state;
    const { destroyStudentSessionAppl } = this.props;
    return (
      <List.Item
        actions={[
          <Button
            type={editing[application.id] ? 'default' : 'primary'}
            onClick={() => this.toggleEditMode(application.id)}
          >
            {editing[application.id] ? 'Cancel' : 'Edit'}
          </Button>,
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => destroyStudentSessionAppl(application.id)}
          >
            <span style={{ color: '#ff4d4f', cursor: 'pointer' }}>Delete</span>
          </Popconfirm>
        ]}
      >
        <List.Item.Meta
          title={this.getCompany(application.company).name}
          description={this.renderMotivationField(
            application.motivation,
            application.id
          )}
          avatar={
            <Avatar
              src={this.getCompany(application.company).logoUrl}
              size={128}
              shape="square"
              alt="Company Logotype"
            />
          }
        />
      </List.Item>
    );
  };

  renderMotivationField = (motivation: string, id: string) => {
    const { editing } = this.state;
    if (editing[id])
      return (
        <UpdateSessionApplicationForm
          initialValues={{ motivation }}
          id={id}
          onSubmit={values => this.updateStudentSessionAppl(id, values)}
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
      <div className="session-applications">
        <HtmlTitle title="Student Session Application" />
        <h1>Student Session Applications</h1>
        <List
          size="large"
          bordered
          dataSource={sortBy(
            appl => this.getCompany(appl.company).name,
            applications || []
          )}
          renderItem={this.renderApplication}
          locale={{ emptyText: 'No Applications' }}
        />
      </div>
    );
  }
}

export default SessionApplications;
