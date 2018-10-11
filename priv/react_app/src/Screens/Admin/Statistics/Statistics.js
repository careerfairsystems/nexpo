import React, { Component } from 'react';
import { Table } from 'antd';
import { orderBy, divide } from 'lodash/fp';
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
    const {
      companyStats = [],
      nbrSearchingStudents,
      nbrStudents,
      nbrApplications
    } = statistics;
    return (
      <div>
        <h1>Statistics</h1>
        {`Number of students that has applied: ${nbrSearchingStudents}`}
        <br />
        {`Number of students: ${nbrStudents}`}
        <br />
        {`Percentage of students that has applied: ${divide(
          nbrSearchingStudents || 0,
          nbrStudents || 1
        ) * 100}%`}
        <br />
        {`Average number of applications per student: ${divide(
          nbrApplications || 0,
          nbrSearchingStudents || 1
        )}`}
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

Statistics.propTypes = {
  getAllStatistics: PropTypes.func.isRequired,
  statistics: PropTypes.shape({
    companyStats: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
        nbrApplications: PropTypes.number
      })
    ),
    nbrStudents: PropTypes.number,
    nbrSearchingStudents: PropTypes.number
  }).isRequired
};
Statistics.defaultProps = {};

export default Statistics;
