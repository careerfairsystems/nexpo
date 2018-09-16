import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NEntry from './NEntry';
import { State } from '../../Store/reducers/index';

/**
 * Responsible for rendering a attribute. Attribute id is recieved via url
 */
const Attribute = ({ attribute }) => (
  <div>
    {attribute.title}
    {attribute.entries.map(id => <NEntry id={id} />)}
  </div>
);

Attribute.propTypes = {
  attribute: PropTypes.object.isRequired
};

const stateful = connect((state: State, props) => {
  const attributeId = props.id;

  return {
    id: attributeId,
    attribute: state.entities.attributes[attributeId] || {}
  };
});

export default stateful(Attribute);
