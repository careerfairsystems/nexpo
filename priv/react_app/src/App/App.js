import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Breadcrumb from 'antd/lib/breadcrumb';
import Icon from 'antd/lib/icon';

import { startCase } from 'lodash/fp';

import { Route, Switch, Redirect, Link } from 'react-router-dom';
import PrivateRoute from '../Components/PrivateRoute';

import Startscreen from '../Screens/Startscreen';
import Categories from '../Screens/Categories';
import Category from '../Screens/Category';
import Roles from '../Screens/Roles';
import Role from '../Screens/Role';
import Users from '../Screens/Users';
import User from '../Screens/User';
import CurrentUser from '../Screens/CurrentUser';
import Companies from '../Screens/Companies';
import Company from '../Screens/Company';
import Session from '../Screens/Session';
import SessionApplication from '../Screens/SessionApplication';
import SessionApplications from '../Screens/SessionApplications';
import SessionCompanies from '../Screens/SessionCompanies';
import Login from '../Screens/Login';
import Logout from '../Screens/Logout';
import Signup from '../Screens/Signup';
import ForgotPassword from '../Screens/ForgotPassword';
import NotFound from '../Screens/NotFound';

import HtmlTitle from '../Components/HtmlTitle';
import { hasPermission } from '../Util/PermissionsHelper';

const { Header, Content, Footer } = Layout;

const routes = (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/start" />} />
    <Route exact path="/start" component={Startscreen} />
    <PrivateRoute exact path="/categories" component={Categories} />
    <PrivateRoute path="/categories/:id" component={Category} />
    <PrivateRoute exact path="/companies" component={Companies} />
    <PrivateRoute exact path="/companies/new" component={Company} />
    <PrivateRoute path="/companies/:id" component={Company} />
    <PrivateRoute exact path="/users" component={Users} />
    <PrivateRoute path="/users/:id" component={User} />
    <PrivateRoute exact path="/roles" component={Roles} />
    <PrivateRoute path="/roles/:id" component={Role} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/signup" component={Signup} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/user" component={CurrentUser} />
    <PrivateRoute exact path="/session" component={Session} />
    <PrivateRoute path="/session/application" component={SessionApplication} />
    <PrivateRoute
      path="/session/applications"
      component={SessionApplications}
    />
    <PrivateRoute path="/session/companies" component={SessionCompanies} />
    <Route component={NotFound} />
  </Switch>
);

/**
 * The base of the application. Defines the basic layout
 */
class App extends Component {
  loggedInMenuItem = () => {
    const { currentUser } = this.props;
    const { email, firstName, lastName } = currentUser;

    const displayName = firstName ? [firstName, lastName].join(' ') : email;

    return [
      <Menu.Item key="/user">
        {displayName} <Icon type="user" />
      </Menu.Item>,
      <Menu.Item key="/logout">Logout</Menu.Item>
    ];
  };

  restrictedSubMenu = ({ route, title, menus }) => {
    const { currentUser, isLoggedIn, redirect } = this.props;
    if (isLoggedIn && hasPermission(currentUser, route)) {
      return (
        <Menu.SubMenu
          title={title}
          key={`/${route}`}
          onTitleClick={() => redirect(`/${route}`)}
        >
          {menus}
        </Menu.SubMenu>
      );
    }
    return null;
  };

  restrictedMenuItem = ({ route, title }) => {
    const { currentUser, isLoggedIn } = this.props;
    if (isLoggedIn && hasPermission(currentUser, route)) {
      return <Menu.Item key={`/${route}`}>{title}</Menu.Item>;
    }
    return null;
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
          <Link to={url}>{startCase(item)}</Link>
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
              {this.restrictedMenuItem({
                route: 'companies',
                title: 'Companies'
              })}
              {this.restrictedMenuItem({
                route: 'categories',
                title: 'Categories'
              })}
              {this.restrictedMenuItem({
                route: 'roles',
                title: 'Roles'
              })}
              {this.restrictedMenuItem({
                route: 'users',
                title: 'Users'
              })}
              {this.restrictedSubMenu({
                route: 'session',
                title: 'Student Session',
                menus: [
                  this.restrictedMenuItem({
                    route: 'session/application',
                    title: 'Apply'
                  }),
                  this.restrictedMenuItem({
                    route: 'session/applications',
                    title: 'View Applications'
                  }),
                  this.restrictedMenuItem({
                    route: 'session/companies',
                    title: 'View Companies'
                  })
                ]
              })}
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
