import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash/fp';
import { List, Rate } from 'antd';
import { toExternal } from '../../../Util/URLHelper';
import NotFound from '../../NotFound';
import HtmlTitle from '../../../Components/HtmlTitle';
import '../YourCompany.css';

class YourCompanyApplications extends Component {
  static propTypes = {
    currentCompany: PropTypes.object.isRequired,
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
          href={toExternal(application.student.resumeSvUrl)}
          disabled={application.student.resumeSvUrl}
        >
          Swedish Resume
        </a>,
        <a
          href={toExternal(application.student.resumeEnUrl)}
          disabled={application.student.resumeEnUrl}
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
    const { currentCompany } = this.props;

    if (isEmpty(currentCompany) || isNil(currentCompany)) return <NotFound />;

    return (
      <div className="company-show-view">
        <HtmlTitle title="Applications" />
        <h3>Student Session Applications</h3>
        <List
          size="large"
          itemLayout="vertical"
          bordered
          dataSource={currentCompany.studentSessionApplications}
          renderItem={this.renderSessionApplication}
          locale={{ emptyText: 'No Session Applications' }}
        />
      </div>
    );
  }
}

export default YourCompanyApplications;
