import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CompanyForm from '../../../../Components/Forms/CompanyForm';
import '../Company.css';

/**
 * Responsible for rendering a company. Company id is recieved via url
 */
class CompanyNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: { logoUrl: null }
    };
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

  createCompany = values => {
    const { createCompany } = this.props;
    const { company: stateCompany } = this.state;
    const newCompany = {
      ...values,
      ...stateCompany
    };
    createCompany({ company: newCompany });
  };

  render() {
    return (
      <div className="company-edit-view">
        <div>
          <CompanyForm
            onSubmit={this.createCompany}
            beforeUpload={this.beforeUpload}
            onRemove={this.onRemove}
            logoUrl={this.state.company.logoUrl}
          />
        </div>
      </div>
    );
  }
}

CompanyNew.defaultProps = {
  id: null,
  match: {
    path: ''
  }
};
CompanyNew.propTypes = {
  id: PropTypes.string,
  createCompany: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string
  }),
  resetForm: PropTypes.func.isRequired
};

export default CompanyNew;
