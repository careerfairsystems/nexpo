import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AlertWarning from 'material-ui/svg-icons/alert/warning';
import { yellow500 } from 'material-ui/styles/colors';
import { Redirect } from 'react-router-dom';
import './DevelopmentLogin.css';
import HtmlTitle from '../../../Components/HtmlTitle';

/**
 * Handles authorization in development
 * - Allows login by only specifying email
 */
class DevelopLogin extends Component {
  state = {
    email: ''
  };

  login() {
    this.setState({ failure: false });
    const { email } = this.state;
    this.props.login(email);
  }

  render() {
    const { email } = this.state;
    const { error, isLoggedIn } = this.props;

    // Url that redirected here
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    if (isLoggedIn) {
      return <Redirect to={from} />;
    }

    return (
      <div className="DevelopmentLogin_Component">
        <HtmlTitle title="Dev Login" />
        <AlertWarning color={yellow500} style={styles.icon} />
        <h1>Development Login</h1>
        <TextField
          floatingLabelText="Email"
          errorText={error ? 'User does not exist' : null}
          value={email}
          autoFocus
          onChange={(event, val) => this.setState({ email: val })}
          onKeyPress={event => (event.key === 'Enter' ? this.login() : null)}
        />
        <br />
        <br />
        <RaisedButton
          label="Login as user"
          primary
          onTouchTap={() => this.login()}
        />
      </div>
    );
  }
}

const styles = {
  icon: {
    height: '200px',
    width: 'auto'
  }
};

export default DevelopLogin;
