import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash/fp';
import Avatar from 'antd/lib/avatar';
import { toExternal } from '../../../Util/URLHelper';
import NotFound from '../../NotFound';
import HtmlTitle from '../../../Components/HtmlTitle';
import InvisibleLink from '../../../Components/InvisibleLink';

class Company extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {
    const { getCurrentCompany } = this.props;
    getCurrentCompany();
  }

  showStudentSession() {
    const { currentCompany } = this.props;
    switch (currentCompany.studentSessionDays) {
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
    const { currentCompany } = this.props;

    if (isEmpty(currentCompany) || isNil(currentCompany)) return <NotFound />

    const { name, description, website, logoUrl } = currentCompany;

    return (
      <div className="company-show-view">
        <HtmlTitle title={name} />

        <div>
          <Avatar
            src={logoUrl}
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
        <InvisibleLink to="/company/edit">Edit</InvisibleLink>
      </div>
    );
  }
}

Company.defaultProps = {
};

Company.propTypes = {
  currentCompany: PropTypes.object.isRequired,
  getCurrentCompany: PropTypes.func.isRequired
};

export default Company;
