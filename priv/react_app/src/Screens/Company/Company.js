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
      name: props.company.name,
      website: props.company.website,
      description: props.company.description
    };
  }

  componentWillMount() {
    const { id, getCompany } = this.props;
    getCompany(id);
  }

  changeState = () => {
    const { edit } = this.state;
    this.setState({ edit: !edit });
  };

  renderEditView() {
    const { company } = this.props;
    if (isEmpty(company) || isNil(company)) {
      return <NotFound />;
    }
    const { TextArea } = Input;

    const { name, website, description } = company;
    return (
      <div className="Company_Component">
        <HtmlTitle title={name} />

        <div className="left-col">
          <div className="paper main-info">
            Name:
            <div>
              <Input style={{ width: '50%' }} defaultValue={name} />
            </div>
            Website:
            <div>
              <Input style={{ width: '50%' }} defaultValue={website} />
            </div>
            Description:
            <div>
              <TextArea defaultValue={description} autosize />
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
      return <NotFound />;
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
