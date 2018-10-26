import React, { Component } from 'react';
import { Col, Row, Table } from 'antd';
import { orderBy, divide, groupBy, sortBy } from 'lodash/fp';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer
} from 'victory';
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

type Props = {
  getAllStatistics: () => Promise<any>,
  statistics: {
    companyStats: Array<{
      name?: string,
      id: number,
      nbrApplications: number
    }>,
    nbrStudents: number,
    nbrSearchingStudents: number
  }
};
class Statistics extends Component<Props> {
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
      applicationsPerDay = [],
      wordsPerAppl = 0
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
            <br />
            {`Average number of words per application: ${wordsPerAppl.toFixed(
              2
            )}`}
          </Col>
          <Col span={10}>
            <VictoryChart
              containerComponent={
                <VictoryVoronoiContainer
                  labels={d => `y: ${d.y}, x: ${d.x}`}
                  labelComponent={
                    <VictoryTooltip
                      cornerRadius={0}
                      flyoutStyle={{ fill: 'white' }}
                    />
                  }
                />
              }
            >
              <VictoryLabel
                text="Number of applications over time"
                x={225}
                y={30}
                textAnchor="middle"
              />
              {/* Add this back on the 19th Wooo

              <VictoryLine
                style={{
                  data: { stroke: 'red', strokeWidth: 2 },
                  labels: { angle: -90, fill: 'red', fontSize: 20 }
                }}
                labels={['Deadline']}
                labelComponent={<VictoryLabel y={200} />}
                x={() => (data.length > 0 ? '2018-10-19' : null)}
              /> */}
              <VictoryAxis tickCount={3} />
              <VictoryAxis
                style={{ axisLabel: { marginRight: 20 } }}
                dependentAxis
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

export default Statistics;
