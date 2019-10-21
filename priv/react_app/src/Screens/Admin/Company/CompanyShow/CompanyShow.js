import React, { Component } from 'react';
import {
  isEmpty,
  isNil,
  sortBy,
  groupBy,
  filter,
  last,
  map,
  toPairs,
  reduce,
  getOr,
  flatten,
  flow
} from 'lodash/fp';
import { List, Avatar, Button, Tag, Popconfirm, Select } from 'antd';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import NotFound from '../../../NotFound';
import { toExternal } from '../../../../Util/URLHelper';
import { toDayFormat } from '../../../../Util/FormatHelper';
import InvisibleLink from '../../../../Components/InvisibleLink';
import HtmlTitle from '../../../../Components/HtmlTitle';
import LoadingSpinner from '../../../../Components/LoadingSpinner';
import '../Company.css';
import CompanyStudentSessionForm from '../../../../Forms/CompanyStudentSessionForm';
/**
 * Responsible for rendering a company. Company id is recieved via url
 */
type Props = {
  id: string,
  createStudentSession: ({}) => Promise<void>,
  deleteStudentSession: string => Promise<void>,
  company: {
    id?: string,
    name?: string,
    website?: string,
    description?: string,
    logoUrl?: string,

    studentSessionDays?: number,
    studentSessionApplications?: Array<*>,
    studentSessionTimeSlots?: Array<{
      id: number,
      start: string,
      end: string,
      location: string,
      studentSession: {
        student: {
          user: {
            firstName?: string,
            lastName?: string,
            email?: string,
            phoneNumber?: string
          }
        }
      }
    }>,
    topStudents?: Array<{ id: number, firstName: string, lastName: string }>
  },
  fetching: boolean,
  getCompany: string => Promise<void>,
  match?: {
    path: string
  }
};
const statusLabel = [
  { text: 'Unanswered', color: 'gold' },
  { text: 'Confirmed', color: 'green' },
  { text: 'Declined', color: 'red' }
];

class CompanyShow extends Component<Props> {
  static defaultProps = {
    match: {
      path: ''
    }
  };

  componentWillMount() {
    const { id, getCompany } = this.props;
    getCompany(id);
  }

  handleSubmit = (values: { studentId: string }, id: number) => {
    const { company, createStudentSession } = this.props;
    createStudentSession({
      studentSession: {
        companyId: company.id,
        studentId: values.studentId,
        studentSessionTimeSlotId: id
      }
    });
  };

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

    const {
      name = '',
      website,
      logoUrl,
      description,
      topStudents = [],
      studentSessionTimeSlots = [],
      studentSessionApplications = []
    } = company;

    const studentSessionStatus = studentSession => {
      if (studentSession) {
        return statusLabel[studentSession.studentSessionStatus].text;
      }
      return 'Not assigned';
    };
    const studentSessionStatusColor = studentSession => {
      if (studentSession) {
        return statusLabel[studentSession.studentSessionStatus].color;
      }
      return 'blue';
    };
    const studentInfo = ({ student: { user } }) => (
      <>
        Name: {[user.firstName, user.lastName].join(' ')}
        <br />
        Email: {user.email}
        <br />
        Phone Number: {user.phoneNumber}
        <br />
      </>
    );
    const options = map(
      s => (
        <Select.Option key={s.id}>{`${s.firstName} ${
          s.lastName
        }`}</Select.Option>
      ),
      topStudents
    );

    const data = flow(
      sortBy(['location', 'start']),
      map(({ studentSession, ...rest }) => ({
        ...getOr({}, 'student.user', studentSession),
        ...rest
      })),
      reduce((acc, curr) => {
        const prev = last(acc) || {};
        const start = prev.end;
        const end = curr.start;

        const sameLocation = prev.location === curr.location;
        const sameDay = moment(start).isSame(end, 'day');

        if (start !== end && sameDay && sameLocation) {
          const breaktime = moment(end).diff(start, 'minutes');
          acc.push({
            start,
            end,
            location: curr.location,
            firstName: `Break (${breaktime} min)`
          });
        }

        return acc.concat([curr]);
      }, []),
      groupBy(
        ({ start, location }) => `${moment(start).format('dddd')} - ${location}`
      ),
      toPairs,
      map(([key, values]) => [
        ['', key],
        ...flatten(
          values.map(({ start, firstName, lastName, email, phoneNumber }) => [
            [moment(start).format('HH:mm'), [firstName, lastName].join(' ')],
            ['', email],
            ['', phoneNumber && `=""${phoneNumber}""`]
          ])
        ),
        [],
        []
      ]),
      flatten
    )(studentSessionTimeSlots);

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
        <h4>
          {`Student Session Application Scored: ${
            filter('score', studentSessionApplications).length
          }`}
        </h4>
        <p>
          {name} has student sessions: {this.showStudentSession()}
        </p>
        <p>{description}</p>
        <h3>Student Session Time Slots</h3>
        <CSVLink data={data} filename={`${name} - Student Sessions.csv`}>
          <Button icon="download">Download Schema</Button>
        </CSVLink>
        <br />
        <br />
        <List
          itemLayout="vertical"
          dataSource={sortBy(
            ['location', 'start'],
            company.studentSessionTimeSlots || []
          )}
          bordered
          renderItem={({ id, start, end, location, studentSession }, index) => (
            <List.Item
              actions={[
                <>
                  {studentSession ? (
                    <Popconfirm
                      title={`Sure to ${'remove'}?`}
                      onConfirm={() => {
                        const { deleteStudentSession } = this.props;
                        deleteStudentSession(studentSession.id);
                      }}
                    >
                      <Button onClick={() => null} type="danger">
                        Remove
                      </Button>
                    </Popconfirm>
                  ) : (
                    <CompanyStudentSessionForm
                      options={options}
                      id={id}
                      onSubmit={values => this.handleSubmit(values, id)}
                      initialValues={{
                        studentId: options[0] ? options[0].key : null
                      }}
                    />
                  )}
                </>
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
              <Tag color={studentSessionStatusColor(studentSession)}>
                {studentSessionStatus(studentSession)}
              </Tag>
            </List.Item>
          )}
        />
        <br />
        <InvisibleLink to={`/admin/companies/${company.id || ''}/edit`}>
          <Button onClick={() => null} type="primary">
            Edit
          </Button>
        </InvisibleLink>
      </div>
    );
  }
}

export default CompanyShow;
