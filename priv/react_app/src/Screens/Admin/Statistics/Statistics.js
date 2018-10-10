import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { getAllStatistics } = this.props;
    getAllStatistics();
  }

  render() {
    return <div>HEJ</div>;
  }
}

Statistics.propTypes = { getAllStatistics: PropTypes.func.isRequired };
Statistics.defaultProps = {};

export default Statistics;
