import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash/fp';
import NotFound from '../NotFound';
// import MailLink from '../../Components/MailLink';
import HtmlTitle from '../../Components/HtmlTitle';
import './Company.css';

/**
 * Responsible for rendering a company. Company id is recieved via url
 */
class Company extends Component {
  componentWillMount() {
    const { id, getCompany } = this.props;
    getCompany(id);
  }

  render() {
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
        </div>
      </div>
    );
  }
}

Company.propTypes = {
  id: PropTypes.string.isRequired,
  company: PropTypes.object.isRequired,
  getCompany: PropTypes.func.isRequired
};

export default Company;
