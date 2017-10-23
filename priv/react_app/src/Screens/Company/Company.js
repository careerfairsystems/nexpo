import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import MailLink from '../../Components/MailLink'
import { Helmet } from "react-helmet";
import './Company.css'

/**
 * Responsible for rendering a company. Company id is recieved via url
 */
class Company extends Component {
  render() {
    // Find the company
    const company_id_query = this.props.match.params.id
    let company = this.props.companies[company_id_query] || {
      name: "Does not exist",
      email: "Does not exist"
    }
    const {name, email} = company

    return(
      <div className="Company_Component">

        <Helmet>
          <title>Nexpo | {name}</title>
        </Helmet>

        <div className="left-col">

          <Paper>
            <div className="paper main-info">
              <h1>{name}</h1>
              <MailLink to={email}><div>{email}</div></MailLink>
            </div>
          </Paper>

          <Paper>
            <div className="paper categories">
              <h1>Information</h1>
              <hr/>
            </div>
          </Paper>

        </div>

      </div>
    )
  }
}

Company.propTypes = {
  companies: PropTypes.object.isRequired
}

Company.defaultProps = {
  companies: {}
}

export default Company
