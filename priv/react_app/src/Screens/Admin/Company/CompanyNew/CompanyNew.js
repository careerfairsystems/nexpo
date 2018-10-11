import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CompanyForm from '../../../../Components/Forms/CompanyForm';
import '../Company.css';

/**
 * Responsible for rendering a company. Company id is recieved via url
 */
class CompanyNew extends Component {
  createCompany = values => {
    const { createCompany } = this.props;
    createCompany({ company: values });
  };

  render() {
    return (
      <div className="company-new-view">
        <CompanyForm onSubmit={this.createCompany} />
      </div>
    );
  }
}

CompanyNew.propTypes = {
  createCompany: PropTypes.func.isRequired
};

export default CompanyNew;
