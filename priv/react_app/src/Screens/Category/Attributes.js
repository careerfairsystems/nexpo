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
export const Attributes = ({ fetching, attributes, entries }) => (
  <div>
    {fetching && <LoadingSpinner />}
    {!fetching && <Table columns={attributes} dataSource={entries} />}
  </div>
);

Attributes.defaultProps = {
  fetching: false,
  attributes: [],
  entries: []
};

Attributes.propTypes = {
  fetching: PropTypes.bool,
  attributes: PropTypes.array,
  entries: PropTypes.array
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

  const entries = filter(
    ({ attribute }) => attributeIds.includes(attribute),
    state.entities.entries
  )
    .map(entry => ({
      ...entry,
      company: state.entities.companies[entry.company],
      attribute: state.entities.attributes[entry.attribute]
    }))
    .map(entry => ({
      ...entry,
      companyName: entry.company.name,
      [entry.attribute.title.toLowerCase()]: entry.value
    }));

  const companyColumn = {
    title: 'Company',
    dataIndex: 'companyName',
    key: 'company',
    fixed: 'left'
  };

  return {
    attributes: [companyColumn].concat(
      attributes.map(({ title }) => ({
        title,
        dataIndex: title.toLowerCase(),
        key: title.toLowerCase()
      }))
    ),
    entries
  };
});

export default stateful(Attributes);
