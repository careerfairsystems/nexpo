import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil, orderBy } from 'lodash/fp';
import { List, Rate } from 'antd';
import NotFound from '../../NotFound';
import HtmlTitle from '../../../Components/HtmlTitle';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import '../YourCompany.css';

class YourCompanyApplications extends Component {
  static propTypes = {
    currentCompany: PropTypes.object.isRequired,
    fetching: PropTypes.bool.isRequired,
    updating: PropTypes.bool.isRequired,
    getCurrentCompany: PropTypes.func.isRequired,
    updateStudentSessionAppl: PropTypes.func.isRequired
  };

  componentWillMount() {
    const { getCurrentCompany } = this.props;
    getCurrentCompany();
  }

  scoreSessionApplication = (id, value) => {
    const { updateStudentSessionAppl } = this.props;
    updateStudentSessionAppl(id, {
      studentSessionApplication: { score: value }
    });
  };

  renderSessionApplication = application => (
    <List.Item
      actions={[
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
        </a>
      ]}
    >
      <List.Item.Meta
        title={[
          application.student.user.firstName,
          application.student.user.lastName
        ].join(' ')}
        description={application.student.user.email}
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
        </p>
        <List
          size="large"
          itemLayout="vertical"
          bordered
          loading={updating}
          dataSource={orderBy(
            ['score', 'student_id'],
            ['desc', 'asc'],
            currentCompany.studentSessionApplications
          )}
          renderItem={this.renderSessionApplication}
          locale={{ emptyText: 'No Session Applications' }}
        />
      </div>
    );
  }
}

export default YourCompanyApplications;
