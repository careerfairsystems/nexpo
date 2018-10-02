import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash/fp';
import Button from 'antd/lib/button';
import Avatar from 'antd/lib/avatar';
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
      company: { logoUrl: null },
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

  toggleEdit = () => {
    const { edit } = this.state;
    this.setState({ edit: !edit });
  };

  updateCompany = values => {
    const { id, company, createCompany, resetForm, updateCompany } = this.props;
    const { company: stateCompany } = this.state;
    const newCompany = {
      ...values,
      ...stateCompany
    };

    // If this.props.company is empty we are creating a new company
    if (isEmpty(company)) {
      createCompany({ company: newCompany });
      resetForm('company');
    } else {
      updateCompany(id, { company: newCompany });
      this.setState({ edit: false });
    }
  };

  showStudentSession() {
    const { company } = this.props;
    switch (company.studentSessionDays) {
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

  renderEditView() {
    const { company } = this.props;
    const { name } = company;
    return (
      <div className="Company_Component">
        <HtmlTitle title={name} />
        <div>
          <CompanyForm
            action=""
            disabled={false}
            onSubmit={this.updateCompany}
            initialValues={company}
            beforeUpload={this.beforeUpload}
            onRemove={this.onRemove}
            logoUrl={this.state.company.logoUrl}
          />
        </div>
      </div>
    );
  }

  renderShowView() {
    const { company } = this.props;

    const { name, website, description } = company;
    return (
      <div className="Company_Component" style={{ whiteSpace: 'pre-wrap' }}>
        <HtmlTitle title={name} />

        <div className="left-col">
          <div className="paper main-info">
            <Avatar src={company.logoUrl} size={128} alt="Company Logotype" />
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
          <Button onClick={this.toggleEdit}> Edit</Button>
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
