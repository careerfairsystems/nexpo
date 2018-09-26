import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash/fp';
import { Button } from 'antd';
import CompanyForm from '../../Components/Forms/CompanyForm';
import HtmlTitle from '../../Components/HtmlTitle';
import NotFound from '../NotFound';
import LoadingSpinner from '../../Components/LoadingSpinner';
import './Company.css';

/**
 * Responsible for rendering a company. Company id is recieved via url
 */
class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
  }

  componentWillMount() {
    const { id, getCompany, location } = this.props;
    if (location && location.hash === '#edit') {
      this.setState({ edit: true });
    }
    getCompany(id);
  }

  changeState = () => {
    const { edit } = this.state;
    this.setState({ edit: !edit });
  };

  updateCompany = values => {
    const newCompany = {
      ...values,
      name: values.company_name
    };
    const { id, company, createCompany, resetForm, updateCompany } = this.props;
    // If this.props.company is empty we are creating a new company
    if (isEmpty(company)) {
      createCompany({ company: newCompany });
    } else {
      updateCompany(id, { company: newCompany });
    }
    resetForm();
  };

  showStudentSession() {
    const { student_session_days } = this.props.company;
    if (student_session_days === 1) {
      return 'First days';
    }
    if (student_session_days === 2) {
      return 'Second days';
    }
    if (student_session_days === 3) {
      return 'Both days';
    }
    return 'No days';
  }

  renderEditView() {
    const { company } = this.props;
    const { name } = company;
    const initialValue = { ...company, company_name: name };
    return (
      <div className="Company_Component">
        <HtmlTitle title={name} />
        <div>
          <CompanyForm
            disabled={false}
            onSubmit={this.updateCompany}
            initialValues={initialValue}
          />
        </div>
      </div>
    );
  }

  renderShowView() {
    const { company, fetching } = this.props;

    const { name, website, description } = company;
    return (
      <div className="Company_Component">
        <HtmlTitle title={name} />

        <div className="left-col">
          <div className="paper main-info">
            <h1>{name}</h1>
            <a href={website}>{website}</a>
            <p>
              {name} has student sessions: {this.showStudentSession()}
            </p>
            <p>{description}</p>
          </div>
          <div className="paper entries">
            <h2>Entries</h2>
          </div>
          <Button onClick={this.changeState}> Edit</Button>
        </div>
      </div>
    );
  }

  render() {
    const { edit } = this.state;
    const { company, fetching, match } = this.props;
    const isCreatingNew = match && match.path === '/companies/new';
    if (fetching) return <LoadingSpinner />;
    if ((isEmpty(company) || isNil(company)) && !isCreatingNew)
      return <NotFound />;

    if (!edit && !isEmpty(company) && !isNil(company)) {
      return this.renderShowView();
    }
    return this.renderEditView();
  }
}

Company.defaultProps = {
  id: null,
  match: {
    path: ''
  }
};
Company.propTypes = {
  id: PropTypes.string,
  company: PropTypes.object.isRequired,
  createCompany: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  getCompany: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string
  }),
  resetForm: PropTypes.func.isRequired,
  updateCompany: PropTypes.func.isRequired
};

export default Company;
