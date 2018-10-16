import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Table } from 'antd';
import { orderBy, divide, groupBy, sortBy } from 'lodash/fp';
import { VictoryAxis, VictoryLabel, VictoryChart, VictoryLine } from 'victory';
import moment from 'moment';

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
const sortDates = date => moment(date.x).format('x');

const dateFormat = d => moment(d).format('YYYY-MM-DD');

const getData = applicationsPerDay => {
  let countPerDay = 0;
  return sortBy(
    sortDates,
    Object.entries(groupBy(dateFormat, applicationsPerDay)).map(e => ({
      x: e[0],
      y: e[1].length
    }))
  ).map(({ x, y }) => {
    countPerDay += y;
    return {
      x,
      y: countPerDay
    };
  });
};

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
      applicationsPerDay = []
    } = statistics;
    const data = getData(applicationsPerDay);

    const nbrApplications = applicationsPerDay.length;

    return (
      <div>
        <h1>Statistics</h1>
        <Row>
          <Col span={14} style={{ fontSize: '1.2em' }}>
            {`Total Number of applications: ${nbrApplications}`}
            <br />
            {`Total Number of students: ${nbrStudents}`}
            <br />
            {`Number of students that has applied: ${nbrSearchingStudents}`}
            <br />
            {`Percentage of students that has applied: ${(
              divide(nbrSearchingStudents || 0, nbrStudents || 1) * 100
            ).toFixed(2)}`}
            %<br />
            {`Average number of applications per student: ${divide(
              nbrApplications || 0,
              nbrSearchingStudents || 1
            ).toFixed(2)}`}
          </Col>
          <Col span={10}>
            <VictoryChart>
              <VictoryLabel
                text="Number of applications Over time"
                x={225}
                y={30}
                textAnchor="middle"
              />
              <VictoryLine
                style={{
                  data: { stroke: 'red', strokeWidth: 2 },
                  labels: { angle: -90, fill: 'red', fontSize: 20 }
                }}
                labels={['Deadline']}
                labelComponent={<VictoryLabel y={200} />}
                x={() => (data.length > 0 ? '2018-10-19' : null)}
              />
              <VictoryAxis tickCount={3} />
              <VictoryAxis
                style={{ axisLabel: { marginRight: 20 } }}
                dependentAxis
                tickLabelComponent={<VictoryLabel />}
              />
              <VictoryLine data={data} />
            </VictoryChart>
          </Col>
        </Row>
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
