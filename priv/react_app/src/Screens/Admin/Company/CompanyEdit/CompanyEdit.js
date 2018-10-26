import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil, toInteger } from 'lodash/fp';
import { message } from 'antd';

import NotFound from '../../../NotFound';
import API from '../../../../API';
import CompanyForm from '../../../../Forms/CompanyForm';
import InviteForm from '../../../../Forms/InviteForm';
import HtmlTitle from '../../../../Components/HtmlTitle';
import LoadingSpinner from '../../../../Components/LoadingSpinner';
import '../Company.css';

/**
 * Responsible for editing a company. Company id is recieved via url
 */
type Props = {
  id?: string,
  company: { name: string },
  fetching: boolean,
  getCompany: number => Promise<any>,
  history: { push: string => any },
  resetForm: string => any,
  updateCompany: (number, {}) => Promise<any>
};
class CompanyEdit extends Component<Props> {
  static defaultProps = {
    id: null
  };

  componentWillMount() {
    const { id, getCompany } = this.props;
    getCompany(id);
  }

  updateCompany = values => {
    const { id, updateCompany } = this.props;
    updateCompany(id, { company: values });
  };

  onSuccess = () => {
    const { id, history } = this.props;
    history.push(`/admin/companies/${id}`);
  };

  invite = ({ email }) => {
    const { id, resetForm } = this.props;
    API.signup
      .initialRepresentativeSignup({ email, companyId: toInteger(id) })
      .then(res => {
        if (res.ok) {
          message.success(`Invitation sent to ${email}`);
          resetForm('invite');
        } else {
          message.warning('Invitation could not be sent');
        }
      });
  };

  render() {
    const { company, fetching } = this.props;

    if (fetching) return <LoadingSpinner />;
    if (isEmpty(company) || isNil(company)) return <NotFound />;

    return (
      <div className="company-edit-view">
        <HtmlTitle title={company.name} />
        <div>
          <h1>{company.name}</h1>
          <CompanyForm
            onSubmit={this.updateCompany}
            onSubmitSuccess={this.onSuccess}
            initialValues={company}
          />
          <br />
          <br />
          <h2>Invite Company Representatives</h2>
          <InviteForm onSubmit={this.invite} />
        </div>
      </div>
    );
  }
}

export default CompanyEdit;
