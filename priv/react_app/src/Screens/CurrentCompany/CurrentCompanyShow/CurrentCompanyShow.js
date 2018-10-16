import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash/fp';
import { Avatar, Button, List } from 'antd';
import { toExternal } from '../../../Util/URLHelper';
import { toDayFormat } from '../../../Util/FormatHelper';
import NotFound from '../../NotFound';
import HtmlTitle from '../../../Components/HtmlTitle';
import InvisibleLink from '../../../Components/InvisibleLink';
import '../../Admin/Company/Company.css';

class CurrentCompanyShow extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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

    if (isEmpty(currentCompany) || isNil(currentCompany)) return <NotFound />;

    const { name, description, website, logoUrl } = currentCompany;

    return (
      <div className="company-show-view">
        <HtmlTitle title={name} />

        <div className="centering">
          <Avatar
            src={logoUrl}
            size={128}
            shape="square"
            alt="Company Logotype"
          />
          <h1>{name}</h1>
          <a href={toExternal(website)}>{website}</a>
        </div>

        <p>
          {name} has student sessions: {this.showStudentSession()}
        </p>
        <p>{description}</p>
        <h3>Student Session Time Slots</h3>
        <List
          dataSource={currentCompany.studentSessionTimeSlots}
          bordered
          renderItem={({ id, start, end, location }) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar size="large">{id}</Avatar>}
                title={`Location: ${location}`}
                description={`Start Time: ${toDayFormat(
                  start
                )}\nEnd Time: ${toDayFormat(end)}`}
              />
            </List.Item>
          )}
        />
        <br />
        <InvisibleLink to="/company/edit">
          <Button onClick={() => null} type="primary">
            Edit
          </Button>
        </InvisibleLink>
      </div>
    );
  }
}

CurrentCompanyShow.defaultProps = {};

CurrentCompanyShow.propTypes = {
  currentCompany: PropTypes.object.isRequired,
  getCurrentCompany: PropTypes.func.isRequired
};

export default CurrentCompanyShow;
