import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { State } from '../../Store/reducers/index';

/**
 * Responsible for rendering a entry. Entry id is recieved via url
 */
const NEntry = ({ entry }) => <div>{entry.value}</div>;

NEntry.propTypes = {
  entry: PropTypes.object.isRequired
};

const stateful = connect((state: State, props) => {
  const entryId = props.id;

  return {
    id: entryId,
    entry: state.entities.entries[entryId] || {}
  };
});

export default stateful(NEntry);
