import React, { Component } from 'react';
import { isEmpty, isNil } from 'lodash/fp';
import { Avatar, Button, message } from 'antd';
import { toExternal } from '../../../../Util/URLHelper';
import NotFound from '../../../NotFound';
import HtmlTitle from '../../../../Components/HtmlTitle';
import InvisibleLink from '../../../../Components/InvisibleLink';
import LoadingSpinner from '../../../../Components/LoadingSpinner';
import '../../YourCompany.css';
import API from '../../../../API';
import InviteForm from '../../../../Forms/InviteForm';

type Props = {
  fetching: boolean,
  currentCompany: {
    id?: number,
    studentSessionDays?: number,
    name?: string,
    description?: string,
    website?: string,
    logoUrl?: string
  },
  getCurrentCompany: () => Promise<void>,
  resetForm: string => any
};
class YourCompanyProfileShow extends Component<Props> {
  componentWillMount() {
    const { getCurrentCompany } = this.props;
    getCurrentCompany();
  }

  invite = ({ email }: { email: string }) => {
    const { currentCompany, resetForm } = this.props;
    API.signup
      .inviteRepresentative({
        email,
        companyId: currentCompany.id
      })
      .then(res => {
        if (res.ok) {
          message.success(`Invitation sent to ${email}`);
          resetForm('invite');
        } else {
          message.warning('Invitation could not be sent');
        }
      });
  };

  showStudentSession() {
    const { currentCompany } = this.props;
    switch (currentCompany.studentSessionDays) {
      case 0:
        return 'No days';
      case 1:
        return 'First day';
      case 2:
        return 'Second day';
      case 3:
        return 'Both days';
      default:
        return 'Invalid days';
    }
  }

  render() {
    const { currentCompany, fetching } = this.props;

    if (fetching) return <LoadingSpinner />;
    if (isEmpty(currentCompany) || isNil(currentCompany)) return <NotFound />;

    const { name, description, website, logoUrl } = currentCompany;
    return (
      <div className="company-show-view">
        <HtmlTitle title={name} />
        <div className="centering">
          <Avatar
            src={logoUrl}
            size={128}
            shape="square"
            alt="Company Logotype"
          />
          <h1>{name}</h1>
          <a href={toExternal(website)}>{website}</a>
        </div>
        <p>
          {name} has student sessions: {this.showStudentSession()}
        </p>
        <p>{description}</p>
        <br />
        Press the button below to edit your company information.
        <br />
        <InvisibleLink to="/company/profile/edit">
          <Button onClick={() => null} type="primary">
            Edit
          </Button>
        </InvisibleLink>
        <br />
        <br />
        Use the Form below to send a Nexpo invitation to a colleague. They will
        be able to edit the company, log into the ARKAD app and see all student
        sessions.
        <br />
        <InviteForm onSubmit={this.invite} />
      </div>
    );
  }
}

export default YourCompanyProfileShow;
