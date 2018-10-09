import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil, toInteger } from 'lodash/fp';
import message from 'antd/lib/message';
import NotFound from '../../../NotFound';
import API from '../../../../API';
import CompanyForm from '../../../../Components/Forms/CompanyForm';
import InviteForm from '../../../../Components/Forms/InviteForm';
import HtmlTitle from '../../../../Components/HtmlTitle';
import LoadingSpinner from '../../../../Components/LoadingSpinner';
import '../Company.css';

/**
 * Responsible for editing a company. Company id is recieved via url
 */
class CompanyEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: { logoUrl: null }
    };
  }

  componentWillMount() {
    const { id, getCompany } = this.props;
    getCompany(id);
  }

  onRemove = name => {
    const { company } = this.state;
    this.setState({ company: { ...company, [name]: null } });
  };

  beforeUpload = (file, name) => {
    const { company } = this.state;
    this.setState({
      company: { ...company, [name]: file }
    });
    return false;
  };

  updateCompany = values => {
    const { id, updateCompany } = this.props;
    const { company: stateCompany } = this.state;
    const newCompany = {
      ...values,
      ...stateCompany
    };

    updateCompany(id, { company: newCompany });
  };

  invite = ({ email }) => {
    const { id, resetForm } = this.props;
    API.signup
      .initialRepresentativeSignup({ email, companyId: toInteger(id) })
      .then(res => {
        if (res.ok) {
          message.success(`Invitation sent to ${email}.`);
          resetForm('invite');
        } else {
          message.warning('Invitation could not be sent.');
        }
      });
  };

  render() {
    const { company, fetching } = this.props;

    if (fetching) return <LoadingSpinner />;
    if (isEmpty(company) || isNil(company)) return <NotFound />;

    const { name } = company;
    return (
      <div className="company-edit-view">
        <HtmlTitle title={name} />
        <div>
          <h1>{name}</h1>
          <CompanyForm
            onSubmit={this.updateCompany}
            initialValues={company}
            beforeUpload={this.beforeUpload}
            onRemove={this.onRemove}
            logoUrl={this.state.company.logoUrl}
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

CompanyEdit.defaultProps = {
  id: null,
  match: {
    path: ''
  }
};
CompanyEdit.propTypes = {
  id: PropTypes.string,
  company: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired,
  getCompany: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string
  }),
  resetForm: PropTypes.func.isRequired,
  updateCompany: PropTypes.func.isRequired
};

export default CompanyEdit;
