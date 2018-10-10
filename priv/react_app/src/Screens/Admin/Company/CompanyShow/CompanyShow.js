import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash/fp';
import Avatar from 'antd/lib/avatar';
import NotFound from '../../../NotFound';
import { toExternal } from '../../../../Util/URLHelper';
import InvisibleLink from '../../../../Components/InvisibleLink';
import HtmlTitle from '../../../../Components/HtmlTitle';
import LoadingSpinner from '../../../../Components/LoadingSpinner';
import '../Company.css';

/**
 * Responsible for rendering a company. Company id is recieved via url
 */
class CompanyShow extends Component {
  componentWillMount() {
    const { id, getCompany } = this.props;
    getCompany(id);
  }

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

  render() {
    const { company, fetching, id } = this.props;

    if (fetching) return <LoadingSpinner />;
    if (isEmpty(company) || isNil(company)) return <NotFound />;

    const { name, website, description } = company;
    return (
      <div className="company-show-view">
        <HtmlTitle title={name} />

        <div>
          <Avatar
            src={company.logoUrl}
            size={128}
            shape="square"
            alt="Company Logotype"
          />
          <h1>{name}</h1>
          <a href={toExternal(website)}>{website}</a>
          <p>
            {name} has student sessions: {this.showStudentSession()}
          </p>
          <p>{description}</p>
        </div>
        <InvisibleLink to={`/admin/companies/${id}/edit`}>Edit</InvisibleLink>
      </div>
    );
  }
}

CompanyShow.defaultProps = {
  id: null,
  match: {
    path: ''
  }
};
CompanyShow.propTypes = {
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

export default CompanyShow;
