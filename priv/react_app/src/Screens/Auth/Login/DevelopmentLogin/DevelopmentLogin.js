import React, { Component } from 'react';
import { Icon } from 'antd';
import { Redirect } from 'react-router-dom';
import './DevelopmentLogin.css';
import type { Location } from 'react-router-dom';
import HtmlTitle from '../../../../Components/HtmlTitle';
import DevelopmentLoginForm from '../../../../Forms/DevelopmentLoginForm';
/**
 * Handles authorization in development
 * - Allows login by only specifying email
 */
const styles = {
  icon: {
    width: 'auto',
    fontSize: 200,
    color: '#ffeb3b'
  }
};
type Props = {
  location: Location,
  isLoggedIn: boolean,
  login: ({ email: string }) => Promise<void>
};
class DevelopmentLogin extends Component<Props> {
  login = (values: { email: string }) => {
    const { email } = values;
    const { login } = this.props;
    login({ email });
  };

  render() {
    const { isLoggedIn, location } = this.props;

    // Url that redirected here
    const { from } = location.state || { from: { pathname: '/' } };

    if (isLoggedIn) {
      return <Redirect to={from} />;
    }

    return (
      <div className="development-login">
        <HtmlTitle title="Dev Login" />
        <Icon type="warning" theme="filled" style={styles.icon} />
        <h1>Development Login</h1>
        <DevelopmentLoginForm onSubmit={this.login} />
      </div>
    );
  }
}

export default DevelopmentLogin;
