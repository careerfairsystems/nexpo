import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash/fp';
import NotFound from '../NotFound';
import { Button } from 'antd';

class Company extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {
    const { getCurrentCompany } = this.props;
    getCurrentCompany();
  }

  render() {
    const { currentCompany } = this.props;

    console.log( currentCompany );

    if (isEmpty(currentCompany) || isNil(currentCompany)) return <NotFound />

    return (
      <Button title='test' />
    );
  }
}

Company.defaultProps = {
};

Company.propTypes = {
  currentCompany: PropTypes.object.isRequired,
  getCurrentCompany: PropTypes.func.isRequired,
  updateCurrentCompany: PropTypes.func.isRequired
};

export default Company;
