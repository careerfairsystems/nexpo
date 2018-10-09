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
      <div className="company-edit-view">
        <div>
          <CompanyForm onSubmit={this.createCompany} />
        </div>
      </div>
    );
  }
}

CompanyNew.defaultProps = {
  match: {
    path: ''
  }
};

CompanyNew.propTypes = {
  createCompany: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string
  })
};

export default CompanyNew;
