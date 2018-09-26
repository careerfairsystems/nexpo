import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash/fp';
import { Input, Button, Radio } from 'antd';
import NotFound from '../NotFound';
// import MailLink from '../../Components/MailLink';
import HtmlTitle from '../../Components/HtmlTitle';
import './Company.css';

/**
 * Responsible for rendering a company. Company id is recieved via url
 */
class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      company: { ...props.company },
      days: { ...props.company.student_session_days }
    };
  }

  componentWillMount() {
    const { id, getCompany, location } = this.props;
    if (location.hash === '#edit') {
      this.setState({ edit: true });
    }
    getCompany(id);
  }

  onChange1(field, value) {
    const { days } = this.state;
    // console.log('radio1 checked', value);
    this.setState({
      days: value
    });
    if (days === 'First Day') {
      this.updateCompanyState(field, 1);
    } else if (days === 'Second day') {
      this.updateCompanyState(field, 2);
    } else if (days === 'Both day') {
      this.updateCompanyState(field, 3);
    } else {
      this.updateCompanyState(field, 0);
    }
  }

  changeState = () => {
    const { edit } = this.state;
    if (edit) this.updateCompany();
    this.setState({ edit: !edit });
  };

  updateCompany() {
    const { company } = this.state;
    const { id, createCompany, updateCompany } = this.props;
    // If this.props.company is empty we are creating a new company
    if (isEmpty(this.props.company)) {
      createCompany({ company });
    } else {
      updateCompany(id, { company });
    }
  }

  updateCompanyState(field, value) {
    this.setState({ company: { ...this.state.company, [field]: value } });
  }

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
    const { TextArea } = Input;
    const RadioGroup = Radio.Group;
    const plainOptions = ['No days', 'First Day', 'Second day', 'Both day'];

    const { name, website, description } = company;
    return (
      <div className="Company_Component">
        <HtmlTitle title={name} />

        <div className="left-col">
          <div className="paper main-info">
            Name:
            <div>
              <Input
                style={{ width: '50%' }}
                onChange={e => this.updateCompanyState('name', e.target.value)}
                defaultValue={name}
              />
            </div>
            Website:
            <div>
              <Input
                style={{ width: '50%' }}
                onChange={e =>
                  this.updateCompanyState('website', e.target.value)
                }
                defaultValue={website}
              />
            </div>
            Description:
            <div>
              <TextArea
                defaultValue={description}
                onChange={e =>
                  this.updateCompanyState('description', e.target.value)
                }
                autosize
              />
            </div>
            Student Session Days:
            <div>
              <RadioGroup
                options={plainOptions}
                onChange={e =>
                  this.onChange1('student_session_days', e.target.value)
                }
                value={this.state.days}
              />
            </div>
          </div>
          <Button type="primary" onClick={this.changeState}>
            Save
          </Button>
        </div>
      </div>
    );
  }

  renderShowView() {
    const { company } = this.props;
    const { days } = this.state;

    if (isEmpty(company) || isNil(company)) {
      this.changeState();
    }

    const { name, website, description } = company;
    return (
      <div className="Company_Component">
        <HtmlTitle title={name} />

        <div className="left-col">
          <div className="paper main-info">
            <h1>{name}</h1>
            <a href={website}>{website}</a>
            <p>
              {' '}
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
    if (!edit) {
      return this.renderShowView();
    }
    return this.renderEditView();
  }
}

Company.propTypes = {
  id: PropTypes.string.isRequired,
  company: PropTypes.object.isRequired,
  getCompany: PropTypes.func.isRequired
};

export default Company;
