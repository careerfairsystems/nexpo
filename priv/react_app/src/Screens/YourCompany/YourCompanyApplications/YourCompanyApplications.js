import React, { Component } from 'react';
import { isEmpty, isNil, orderBy } from 'lodash/fp';
import { List, Rate, Button } from 'antd';
import NotFound from '../../NotFound';
import HtmlTitle from '../../../Components/HtmlTitle';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import '../YourCompany.css';

type StudentObj = {
  user: {
    email: string,
    firstName: string,
    lastName: string
  },
  resumeSvUrl: string,
  resumeEnUrl: string,
  linkedIn: string,
  master: string,
  year: number,
  programme: {
    code: string,
    name: string
  },
  interests: Array<{ id: number, name: string }>
};
type Application = {
  id: number,
  score: number,
  motivation: string,
  student: StudentObj
};
type Props = {
  currentCompany: { studentSessionApplications?: Array<Application> },
  fetching: boolean,
  updating: boolean,
  getCurrentCompany: () => Promise<void>,
  updateStudentSessionAppl: (number, {}) => Promise<void>
};
class YourCompanyApplications extends Component<Props> {
  componentWillMount() {
    const { getCurrentCompany } = this.props;
    getCurrentCompany();
  }

  scoreSessionApplication = (id: number, value: number) => {
    const { updateStudentSessionAppl } = this.props;
    updateStudentSessionAppl(id, {
      studentSessionApplication: { score: value }
    });
  };

  renderSessionApplication = (application: Application) => (
    <List.Item
      actions={[
        <Button onClick={_ => this.scoreSessionApplication(application.id, 0)}>
          Reset Score
        </Button>,
        <>
          Score:{' '}
          <Rate
            value={application.score}
            onChange={value =>
              this.scoreSessionApplication(application.id, value)
            }
          />
        </>,
        <a
          href={application.student.resumeSvUrl}
          disabled={!application.student.resumeSvUrl}
        >
          Swedish Resume
        </a>,
        <a
          href={application.student.resumeEnUrl}
          disabled={!application.student.resumeEnUrl}
        >
          English Resume
        </a>,
        <a
          href={`//${application.student.linkedIn}`}
          disabled={!application.student.linkedIn}
        >
          LinkedIn
        </a>
      ]}
    >
      <List.Item.Meta
        title={[
          application.student.user.firstName,
          application.student.user.lastName
        ].join(' ')}
        description={[
          `Email: ${application.student.user.email}`,
          `Graduation year: ${
            application.student.year ? application.student.year : 'Not set'
          }`,
          `Programme: ${
            application.student.programme
              ? application.student.programme.name
              : 'Not set'
          }`,
          `Master: ${
            application.student.master ? application.student.master : 'Not set'
          }`,
          `Interests: ${
            application.student.interests.length !== 0
              ? application.student.interests.map(i => i.name).join(', ')
              : 'Not set'
          }`
        ].join('   |   ')}
      />
      {application.motivation}
    </List.Item>
  );

  render() {
    const { currentCompany, fetching, updating } = this.props;

    if (fetching) return <LoadingSpinner />;
    if (isEmpty(currentCompany) || isNil(currentCompany)) return <NotFound />;

    return (
      <div className="company-show-view">
        <HtmlTitle title="Applications" />
        <h3>Student Session Applications</h3>
        <p>
          Please rate each student from 1 to 5 stars, the students with the
          highest scores will be chosen to your student sessions, so rate
          carefully. Also note that the rating will not be shown to the
          students, the rating is only there for you to decide which students
          you want to have sessions with.
          <br />
          <br />
          In case you are not interested in having a student session with a
          particular student, and wish for them to not be able to get a spot.
          Make sure to leave that student without a rating. There is the{' '}
          <i>Reset Score</i> button in case you need to reset the score to 0.
        </p>
        <List
          size="large"
          itemLayout="vertical"
          bordered
          loading={updating}
          dataSource={orderBy(
            ['score', 'studentId'],
            ['desc', 'asc'],
            currentCompany.studentSessionApplications || []
          )}
          renderItem={this.renderSessionApplication}
          locale={{ emptyText: 'No Session Applications' }}
        />
      </div>
    );
  }
}

export default YourCompanyApplications;
