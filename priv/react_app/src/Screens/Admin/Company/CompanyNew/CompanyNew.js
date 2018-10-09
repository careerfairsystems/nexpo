import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CompanyForm from '../../../../Components/Forms/CompanyForm';
import '../Company.css';

/**
 * Responsible for rendering a company. Company id is recieved via url
 */
class CompanyNew extends Component {
  createCompany = values => {
    let logoUrl;
    const { logoUrl: fileArray } = values;
    if (fileArray && fileArray.length > 0) {
      [logoUrl] = fileArray;
    }
    const { createCompany } = this.props;
    const company = {
      ...values,
      logoUrl
    };
    createCompany({ company });
  };

  render() {
    return (
      <div className="company-edit-view">
        <div>
          <CompanyForm onSubmit={this.createCompany} />
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
