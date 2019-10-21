import React, { Component } from 'react';
import { sortBy } from 'lodash/fp';
import { List, Avatar, Popconfirm, Button } from 'antd';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HtmlTitle from '../../../Components/HtmlTitle';
import UpdateSessionApplicationForm from '../../../Forms/UpdateSessionApplicationForm';
import '../Session.css';

type Company = {
  name: string,
  logoUrl: string
};
type Application = {
  id: string,
  company: Company,
  motivation: string
};
type Props = {
  applications?: ?Array<Application>,
  companies?: {},
  getAllCompanies: () => Promise<void>,
  deleteStudentSessionAppl: string => Promise<void>,
  fetching: boolean,
  updateStudentSessionAppl: (
    string,
    { studentSessionApplication: { motivation: string } }
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

  toggleEditMode = (id: string) => {
    const { editing: stateEditing } = this.state;
    const editing = {};
    editing[id] = !stateEditing[id];
    this.setState({ editing });
  };

  updateStudentSessionAppl = (id: string, values: { motivation: string }) => {
    const { updateStudentSessionAppl } = this.props;
    updateStudentSessionAppl(id, { studentSessionApplication: values });
    this.setState({ editing: {} });
  };

  renderApplication = (application: Application) => {
    const { editing } = this.state;
    const { deleteStudentSessionAppl } = this.props;
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
	    placement="topLeft"
            title="Are you sure you want to delete the application?"
            onConfirm={() => deleteStudentSessionAppl(application.id)}
          >
            <span style={{ color: '#ff4d4f', cursor: 'pointer' }}>Delete</span>
          </Popconfirm>
        ]}
      >
        <List.Item.Meta
          title={application.company.name}
          description={this.renderMotivationField(
            application.motivation,
            application.id
          )}
          avatar={
            <Avatar
              src={application.company.logoUrl}
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

    return (
      <div className="session-applications">
        <HtmlTitle title="Student Session Application" />
        <h1>Student Session Applications</h1>
        <List
          size="large"
          bordered
          dataSource={sortBy('company.name', applications || [])}
          renderItem={this.renderApplication}
          locale={{ emptyText: 'No Applications' }}
        />
      </div>
    );
  }
}

export default SessionApplications;
