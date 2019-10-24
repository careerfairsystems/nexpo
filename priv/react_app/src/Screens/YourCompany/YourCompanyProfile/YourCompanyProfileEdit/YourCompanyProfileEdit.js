import React, { Component } from 'react';
import { isEmpty, isNil } from 'lodash/fp';
import type { RouterHistory } from 'react-router-dom';
import NotFound from '../../../NotFound';
import CurrentCompanyForm from '../../../../Forms/CurrentCompanyForm';
import LoadingSpinner from '../../../../Components/LoadingSpinner';

type CurrentCompany = {
  id?: number,
  name?: string,
  studentSessionDays?: number
};

type Props = {
  fetching: boolean,
  history: RouterHistory,
  currentCompany: CurrentCompany,
  getCurrentCompany: () => Promise<void>,
  updateCurrentCompany: ({ company: {} }) => Promise<void>
};
class YourCompanyProfileEdit extends Component<Props> {
  componentWillMount() {
    const { getCurrentCompany } = this.props;
    getCurrentCompany();
  }

  updateCurrentCompany = (values: {
    website: string,
    description: string,
    logoUrl: File
  }) => {
    const { updateCurrentCompany } = this.props;
    return updateCurrentCompany({ company: values });
  };

  onSuccess = () => {
    const { history } = this.props;
    history.push('/company/profile');
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

    const { name } = currentCompany;

    return (
      <div>
        <h1>{name}</h1>
        <div style={{ marginBottom: 20 }}>
          Student Session Days: {this.showStudentSession()}
        </div>
        <CurrentCompanyForm
          onSubmit={this.updateCurrentCompany}
          onSubmitSuccess={this.onSuccess}
          initialValues={currentCompany}
        />
      </div>
    );
  }
}

export default YourCompanyProfileEdit;
