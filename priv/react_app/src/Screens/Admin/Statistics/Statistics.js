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
        <h1>Statistics</h1>
        {`Number of searching students: ${statistics.nbrSearchingStudents}`}
        <br />
        {`Number of students: ${statistics.nbrStudents}`}
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
