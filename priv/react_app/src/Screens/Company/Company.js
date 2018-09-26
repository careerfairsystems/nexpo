import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash/fp';
import { Input, Button } from 'antd';
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
      company: { ...props.company }
    };
  }

  componentWillMount() {
    const { id, getCompany, location } = this.props;
    if (location.hash === '#edit') {
      this.setState({ edit: true });
    }
    getCompany(id);
  }

  changeState = () => {
    const { edit } = this.state;
    if (edit) this.updateCompany();
    this.setState({ edit: !edit });
  };

  updateCompany() {
    const { company } = this.state;
    const { id } = this.props;
    // If this.props.company is empty we are creating a new company
    if (isEmpty(this.props.company)) {
      this.props.createCompany({ company });
    } else {
      this.props.updateCompany(id, { company });
    }
  }

  updateCompanyState(field, value) {
    this.setState({ company: { ...this.state.company, [field]: value } });
  }

  renderEditView() {
    const { company } = this.props;
    const { TextArea } = Input;

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
