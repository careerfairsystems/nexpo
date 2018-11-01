import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil, sortBy, filter } from 'lodash/fp';
import { List, Avatar, Button, Tag, Popconfirm } from 'antd';
import NotFound from '../../../NotFound';
import { toExternal } from '../../../../Util/URLHelper';
import { toDayFormat } from '../../../../Util/FormatHelper';
import InvisibleLink from '../../../../Components/InvisibleLink';
import HtmlTitle from '../../../../Components/HtmlTitle';
import LoadingSpinner from '../../../../Components/LoadingSpinner';
import '../Company.css';

/**
 * Responsible for rendering a company. Company id is recieved via url
 */
class CompanyShow extends Component {
  static propTypes = {
    id: PropTypes.string,
    company: PropTypes.object.isRequired,
    fetching: PropTypes.bool.isRequired,
    getCompany: PropTypes.func.isRequired,
    createStudentSession: PropTypes.func.isRequired,
    createBulkStudentSessions: PropTypes.func.isRequired,
    deleteStudentSession: PropTypes.func.isRequired,
    match: PropTypes.shape({
      path: PropTypes.string
    })
  };

  static defaultProps = {
    id: null,
    match: {
      path: ''
    }
  };

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
    const { company, fetching } = this.props;

    if (fetching) return <LoadingSpinner />;
    if (isEmpty(company) || isNil(company)) return <NotFound />;

    const { name, website, description } = company;

    const studentConfirmed = studentSession => {
      if (studentSession) {
        return studentSession.studentConfirmed ? 'Confirmed' : 'Not Confirmed';
      }
      return 'Not assigned';
    };
    const studentConfirmedColor = studentSession => {
      if (studentSession) {
        return studentSession.studentConfirmed ? 'green' : 'gold';
      }
      return 'red';
    };
    const studentInfo = ({ student: { user } }) => (
      <>
        Name: {[user.firstName, user.lastName].join(' ')}
        <br />
        Email: {user.email}
        <br />
      </>
    );

    return (
      <div className="company-show-view">
        <HtmlTitle title={name} />
        <div className="centering">
          <Avatar
            src={company.logoUrl}
            size={128}
            shape="square"
            alt="Company Logotype"
          />
          <h1>{name}</h1>
          <a href={toExternal(website)}>{website}</a>
        </div>
        <h4>
          {`Student Session Application Scored: ${
            filter('score', company.studentSessionApplications).length
          }`}
        </h4>
        <p>
          {name} has student sessions: {this.showStudentSession()}
        </p>
        <p>{description}</p>
        <h3>Student Session Time Slots</h3>
        <Popconfirm
          title="Sure to assign empty and non-confirmed time slots?"
          onConfirm={() => {
            const { createBulkStudentSessions } = this.props;
            createBulkStudentSessions({
              studentSessions: {
                companyId: company.id
              }
            });
          }}
        >
          <Button onClick={() => null} type="primary">
            Assign all
          </Button>
        </Popconfirm>
        <br />
        <br />
        <List
          itemLayout="vertical"
          dataSource={sortBy('start', company.studentSessionTimeSlots)}
          bordered
          renderItem={({ id, start, end, location, studentSession }, index) => (
            <List.Item
              actions={[
                <Popconfirm
                  title={`Sure to ${studentSession ? 'remove' : 'assign'}?`}
                  onConfirm={() => {
                    const {
                      createStudentSession,
                      deleteStudentSession
                    } = this.props;
                    if (studentSession) {
                      deleteStudentSession(studentSession.id);
                    } else {
                      createStudentSession({
                        studentSession: {
                          companyId: company.id,
                          studentSessionTimeSlotId: id
                        }
                      });
                    }
                  }}
                >
                  <span style={{ color: '#1890ff', cursor: 'pointer' }}>
                    {studentSession ? 'Remove' : 'Assign'}
                  </span>
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar size="large">{index + 1}</Avatar>}
                title={`Location: ${location}`}
                description={`Start Time: ${toDayFormat(
                  start
                )}\nEnd Time: ${toDayFormat(end)}`}
              />
              {studentSession && studentInfo(studentSession)}
              Student:{' '}
              <Tag color={studentConfirmedColor(studentSession)}>
                {studentConfirmed(studentSession)}
              </Tag>
            </List.Item>
          )}
        />
        <br />
        <InvisibleLink to={`/admin/companies/${company.id}/edit`}>
          <Button onClick={() => null} type="primary">
            Edit
          </Button>
        </InvisibleLink>
      </div>
    );
  }
}

export default CompanyShow;
