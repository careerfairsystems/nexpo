import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Breadcrumb from 'antd/lib/breadcrumb';
import Icon from 'antd/lib/icon';

import { capitalize } from 'lodash/fp';

import { Route, Switch, Redirect, Link } from 'react-router-dom';
import PrivateRoute from '../Components/PrivateRoute';

import Categories from '../Screens/Categories';
import Category from '../Screens/Category';
import User from '../Screens/User';
import Companies from '../Screens/Companies';
import Company from '../Screens/Company';
import NotFound from '../Screens/NotFound';
import Login from '../Screens/Login';
import Logout from '../Screens/Logout';
import Signup from '../Screens/Signup';
import ForgotPassword from '../Screens/ForgotPassword';
import Startscreen from '../Screens/Startscreen';

import HtmlTitle from '../Components/HtmlTitle';

const { Header, Content, Footer } = Layout;

const routes = (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/start" />} />
    <Route exact path="/start" component={Startscreen} />
    <Route exact path="/categories" component={Categories} />
    <PrivateRoute path="/categories/:id" component={Category} />
    <Route exact path="/companies" component={Companies} />
    <PrivateRoute path="/companies/:id" component={Company} />
    <PrivateRoute path="/companies/new" component={Company} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/signup" component={Signup} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <PrivateRoute path="/user/profile" component={User} />
    <Route component={NotFound} />
  </Switch>
);

/**
 * The base of the application. Defines the basic layout
 */
class App extends Component {
  loggedInMenuItem = () => {
    const { currentUser } = this.props;
    const { email, first_name: firstName, last_name: lastName } = currentUser;

    const displayName = firstName ? [firstName, lastName].join(' ') : email;

    return [
      <Menu.Item key="/user/profile">
        {displayName} <Icon type="user" />
      </Menu.Item>,
      <Menu.Item key="/logout">Logout</Menu.Item>
    ];
  };

  loggedOutMenuItem = () => [
    <Menu.Item key="/login">Login</Menu.Item>,
    <Menu.Item key="/signup">Sign Up</Menu.Item>
  ];

  render() {
    const { isLoggedIn, redirect, pathname } = this.props;
    const paths = pathname.split('/').filter(i => i);
    const breadcrumbItems = paths.map((item, index) => {
      const url = `/${paths.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{capitalize(item)}</Link>
        </Breadcrumb.Item>
      );
    });

    return (
      <div>
        {/* Always fall back to default htmltitle if screen does not specify its own */}
        <HtmlTitle />

        <Layout>
          <Header
            className="header"
            style={{ background: '#fff', overflow: 'hidden' }}
          >
            <Link to="/" className="logo" />

            <Menu
              theme="light"
              mode="horizontal"
              onClick={({ key }) => redirect(key)}
              style={{
                display: 'flex',
                lineHeight: '64px'
              }}
            >
              <Menu.Item key="/companies">Companies</Menu.Item>
              <Menu.Item key="/categories" style={{ flex: 1 }}>
                Categories
              </Menu.Item>
              {isLoggedIn ? this.loggedInMenuItem() : this.loggedOutMenuItem()}
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item key="home">
                <Link to="/">Home</Link>
              </Breadcrumb.Item>
              {breadcrumbItems}
            </Breadcrumb>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                {routes}
              </Content>
            </Layout>
          </Content>
          <Footer />
        </Layout>
      </div>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  redirect: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default App;
