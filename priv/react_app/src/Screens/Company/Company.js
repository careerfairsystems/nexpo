import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotFound from '../NotFound';
import MailLink from '../../Components/MailLink';
import HtmlTitle from '../../Components/HtmlTitle';
import './Company.css';
import { isEmpty, isNil } from 'ramda';

/**
 * Responsible for rendering a company. Company id is recieved via url
 */
class Company extends Component {
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
            <MailLink to={website}>{website}</MailLink>
          </div>

          <div className="paper categories">
            <h2>Information</h2>
            {description}
          </div>
        </div>
      </div>
    );
  }
}

Company.propTypes = {
  company: PropTypes.object.isRequired
};

export default Company;
