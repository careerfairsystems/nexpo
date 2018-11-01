import React, { Component } from 'react';
import CompanyForm from '../../../../Forms/CompanyForm';
import '../Company.css';

/**
 * Responsible for rendering a company. Company id is recieved via url
 */
type Company = {
  name: string,
  website?: string,
  description?: string,
  logoUrl?: {
    uid: number,
    filename: string
  }
};

type Props = {
  createCompany: ({ company: Company }) => Promise<void>
};

class CompanyNew extends Component<Props> {
  createCompany = (values: Company) => {
    const { createCompany } = this.props;
    createCompany({ company: values });
  };

  render() {
    return (
      <div className="company-new-view">
        <CompanyForm onSubmit={this.createCompany} initialValues={{}} />
      </div>
    );
  }
}

export default CompanyNew;
