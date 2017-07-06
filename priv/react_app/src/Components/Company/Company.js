import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import MailLink from '../MailLink'
import { find } from 'ramda'
import './Company.css'

/**
 * Responsible for rendering a company. Company id is recieved via url
 */
class Company extends Component {
  render() {
    // Find the company
    const company_id = this.props.match.params.id
    let company = find(c => Number(c.id) === Number(company_id), this.props.companies)
    company = company || {
      name: "Does not exist",
      email: "Does not exist"
    }

    const {name, email} = company
    return(
      <div className="Company_Component">

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
  companies: PropTypes.array.isRequired
}

Company.defaultProps = {
  companies: []
}

export default Company
