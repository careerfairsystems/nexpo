import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

type Props = {
  logout: () => Promise<void>
};
class Logout extends Component<Props> {
  componentWillMount() {
    const { logout } = this.props;
    logout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default Logout;
