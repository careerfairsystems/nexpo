import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash/fp';
import NotFound from '../../NotFound';
import CurrentCompanyForm from '../../../Forms/CurrentCompanyForm';

class CurrentCompanyEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    const { getCurrentCompany } = this.props;
    getCurrentCompany();
  }

  updateCurrentCompany = values => {
    const { updateCurrentCompany } = this.props;
    return updateCurrentCompany({ company: values });
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
    const { currentCompany } = this.props;

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
          initialValues={currentCompany}
        />
      </div>
    );
  }
}

CurrentCompanyEdit.defaultProps = {};

CurrentCompanyEdit.propTypes = {
  currentCompany: PropTypes.object.isRequired,
  getCurrentCompany: PropTypes.func.isRequired,
  updateCurrentCompany: PropTypes.func.isRequired
};

export default CurrentCompanyEdit;
