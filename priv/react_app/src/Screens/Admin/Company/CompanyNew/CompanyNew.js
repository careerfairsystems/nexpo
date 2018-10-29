import React, { Component } from 'react';
import CompanyForm from '../../../../Forms/CompanyForm';
import '../Company.css';

/**
 * Responsible for rendering a company. Company id is recieved via url
 */
type Props = {
  createCompany: ({ company: {} }) => Promise<void>
};

type NewCompanyValues = {
  name?: string,
  website?: string,
  description?: string,
  logoUrl?: {
    uid: number,
    filename: string
  }
};

class CompanyNew extends Component<Props> {
  createCompany = (values: NewCompanyValues) => {
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

export default CompanyNew;
