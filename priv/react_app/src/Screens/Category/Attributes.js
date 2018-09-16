import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filter, isEmpty } from 'lodash/fp';
import Table from 'antd/lib/table';
import LoadingSpinner from '../../Components/LoadingSpinner';
import { State } from '../../Store/reducers/index';

/**
 * Responsible for rendering a table of attributes and entries
 */
const Attribute = ({ fetching, columns, dataSource }) => (
  <div>
    {fetching && <LoadingSpinner />}
    {!fetching && <Table columns={columns} dataSource={dataSource} />}
  </div>
);

Attribute.defaultProps = {
  fetching: false,
  columns: [],
  dataSource: []
};

Attribute.propTypes = {
  fetching: PropTypes.bool,
  columns: PropTypes.array,
  dataSource: PropTypes.array
};

const stateful = connect((state: State, props) => {
  if (
    isEmpty(state.entities.attributes) ||
    isEmpty(state.entities.entries) ||
    isEmpty(state.entities.companies)
  )
    return { fetching: true };

  const attributeIds = props.ids;

  const attributes = filter(
    ({ id }) => attributeIds.includes(id),
    state.entities.attributes
  );

  const entries = attributes
    .reduce(
      (acc, attribute) =>
        acc.concat(attribute.entries.map(id => ({ id, attribute }))),
      []
    )
    .map(entry => ({ ...entry, ...state.entities.entries[entry.id] }))
    .map(entry => ({
      ...entry,
      company: state.entities.companies[entry.company]
    }))
    .map(entry => ({
      ...entry,
      key: entry.id,
      companyName: entry.company.name,
      [entry.attribute.title.toLowerCase()]: entry.value
    }));

  const companyColumn = {
    title: 'Company',
    dataIndex: 'companyName',
    key: 'companyName',
    fixed: 'left'
  };

  return {
    columns: [companyColumn].concat(
      attributes.map(({ title }) => ({
        title,
        dataIndex: title.toLowerCase(),
        key: title.toLowerCase()
      }))
    ),
    dataSource: entries
  };
});

export default stateful(Attribute);
