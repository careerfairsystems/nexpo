import React, { Component } from 'react';
import { Table } from 'antd';
import { orderBy } from 'lodash/fp';
import PropTypes from 'prop-types';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Number of Applications',
    dataIndex: 'nbrApplications',
    key: 'nbrApplications'
  }
];

class Statistics extends Component {
  componentWillMount() {
    const { getAllStatistics } = this.props;
    getAllStatistics();
  }

  render() {
    const { statistics } = this.props;
    const { companyStats = [] } = statistics;
    return (
      <div>
        {`NUMBER OF SEARCHING STUDENTS: ${statistics.nbrSearchingStudents}`}
        <br />
        {`NUMBER OF STUDENTS: ${statistics.nbrStudents}`}
        <br />
        <br />
        <br />
        <br />
        <br />
        <Table
          columns={columns}
          dataSource={orderBy(
            'nbrApplications',
            'desc',
            Object.keys(companyStats).map(i => ({
              ...companyStats[i],
              key: i
            }))
          )}
        />
      </div>
    );
  }
}

Statistics.propTypes = { getAllStatistics: PropTypes.func.isRequired };
Statistics.defaultProps = {};

export default Statistics;
