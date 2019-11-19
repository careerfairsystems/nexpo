import React, { Component } from 'react';
import { List, Button, Avatar, Rate } from 'antd';
import { sortBy } from 'lodash/fp';
import HtmlTitle from '../../../Components/HtmlTitle';

type User = {
  firstName: string,
  lastName: string,
  email: string,
  profileImage: string
};

type Programme = {
  code: string,
  name: string
};

type Interest = {
  id: number,
  name: string
};

type Student = {
  year: number,
  master: string,
  linkedIn: string,
  programme: Programme,
  resumeEnUrl: string,
  resumeSvUrl: string,
  interests: Array<Interest>,
  user: User
};

type Blip = {
  id: number,
  rating: number,
  comment: string,
  student: Student
};

type Props = {
  currentCompany: {
    blips: Array<Blip>
  },
  fetching: boolean,
  getCurrentCompany: () => Promise<void>
};

class YourCompanyScans extends Component<Props> {
  componentWillMount() {
    const { getCurrentCompany } = this.props;
    getCurrentCompany();
  }

  blipToCsv = (blip: Blip) => {
    const { email } = blip.student.user;
    const name = `${blip.student.user.firstName} ${blip.student.user.lastName}`;
    const year = blip.student.year ? blip.student.year : '';
    const programme = blip.student.programme ? blip.student.programme.name : '';
    const interests = blip.student.interests.map(i => i.name).join('. ');
    const rating = blip.rating ? blip.rating : 0;
    const comment = blip.comment ? blip.comment : '';

    return `${email},${name},${year},${programme},${interests},${rating},${comment}`;
  };

  exportBlips = () => {
    const { currentCompany } = this.props;

    const data = [
      'Email,Name,Graduation year,Programme,Interests,Rating,Comment',
      ...currentCompany.blips.map(this.blipToCsv)
    ].join('\n');

    const blob = new Blob([data]);
    const url = URL.createObjectURL(blob);
    const element = document.createElement('a');
    element.href = url;
    element.download = 'exported_scans.csv';
    element.click();
  };

  renderBlip = (blip: Blip) => (
    <List.Item
      actions={[
        <Rate value={blip.rating} disabled />,
        <a href={blip.student.resumeSvUrl} disabled={!blip.student.resumeSvUrl}>
          Swedish Resume
        </a>,
        <a href={blip.student.resumeEnUrl} disabled={!blip.student.resumeEnUrl}>
          English Resume
        </a>,
        <a
          href={`//${blip.student.linkedIn}`}
          disabled={!blip.student.linkedIn}
        >
          LinkedIn
        </a>
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={blip.student.user.profileImage} size={64} />}
        title={`${blip.student.user.firstName} ${blip.student.user.lastName}`}
        description={[
          `Email: ${blip.student.user.email}`,
          `Graduation year: ${
            blip.student.year ? blip.student.year : 'Not set'
          }`,
          `Programme: ${
            blip.student.programme ? blip.student.programme.name : 'Not set'
          }`,
          `Master: ${blip.student.master ? blip.student.master : 'Not set'}`,
          `Interests: ${
            blip.student.interests.length !== 0
              ? blip.student.interests.map(i => i.name).join(', ')
              : 'Not set'
          }`
        ].join('   |   ')}
      />
      {blip.comment ? `Comment: ${blip.comment}` : 'No comment'}
    </List.Item>
  );

  render() {
    const { currentCompany, fetching } = this.props;

    return (
      <div className="company-show-view">
        <HtmlTitle title="Scans" />
        <div style={{ overflow: 'auto' }}>
          <div
            style={{
              float: 'left',
              marginRight: '10px'
            }}
          >
            <h2>Student Scans</h2>
          </div>
          <Button
            icon="download"
            style={{ float: 'left' }}
            onClick={this.exportBlips}
          >
            Export Scans
          </Button>
        </div>
        <p>
          The exported data will be on <i>.csv</i> (Comma Seperated Values)
          format. This can be read by programs such as Excel.
        </p>
        <br />
        <p>
          For every student their email, name, graduation year, programme and
          interests along with your rating and comment will be exported.
        </p>
        <hr />
        <List
          itemLayout="vertical"
          dataSource={sortBy('id', currentCompany.blips || [])}
          loading={fetching}
          renderItem={this.renderBlip}
          locale={{ emptyText: 'No Scanned Students' }}
        />
      </div>
    );
  }
}

export default YourCompanyScans;
