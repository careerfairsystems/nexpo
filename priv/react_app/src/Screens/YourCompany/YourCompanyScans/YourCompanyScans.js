import React, { Component } from 'react';
import { List, Button } from 'antd';
import HtmlTitle from '../../../Components/HtmlTitle';

type Props = {
  currentCompany: {},
  getCurrentCompany: () => Promise<void>
};

class YourCompanyScans extends Component<Props> {
  componentWillMount() {
    const { getCurrentCompany } = this.props;
    getCurrentCompany();
  }

  render() {
    const { currentCompany } = this.props;

    console.log(currentCompany);

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
          <Button icon="download" style={{ float: 'left' }} onClick={() => {}}>
            Export Scans
          </Button>
        </div>
        <hr />
        <List />
      </div>
    );
  }
}

export default YourCompanyScans;
