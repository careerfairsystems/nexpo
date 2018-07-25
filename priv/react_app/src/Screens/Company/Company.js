import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
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

    const { name, email } = company;
    return (
      <div className="Company_Component">
        <HtmlTitle title={name} />

        <div className="left-col">
          <Paper>
            <div className="paper main-info">
              <h1>{name}</h1>
              <MailLink to={email}>{email}</MailLink>
            </div>
          </Paper>

          <Paper>
            <div className="paper categories">
              <h1>Information</h1>
              <hr />
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

Company.propTypes = {
  company: PropTypes.object.isRequired
};

export default Company;
