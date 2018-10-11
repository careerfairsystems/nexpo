import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Breadcrumb from 'antd/lib/breadcrumb';
import Icon from 'antd/lib/icon';

import { startCase } from 'lodash/fp';

import { Route, Switch, Link } from 'react-router-dom';
import PrivateRoute from '../Components/PrivateRoute';

import Home from '../Screens/Home';
import Info from '../Screens/Info';
import AdminHome from '../Screens/Admin/AdminHome';
import Categories from '../Screens/Admin/Categories';
import Category from '../Screens/Admin/Category';
import Mailtemplates from '../Screens/Admin/Mailtemplates';
import Mailtemplate from '../Screens/Admin/Mailtemplate';
import Deadlines from '../Screens/Admin/Deadlines';
import Deadline from '../Screens/Admin/Deadline';
import Roles from '../Screens/Admin/Roles';
import { RoleEdit, RoleShow } from '../Screens/Admin/Role';
import Users from '../Screens/Admin/Users';
import { UserEdit, UserShow } from '../Screens/Admin/User';
import CurrentUser from '../Screens/CurrentUser';
import Companies from '../Screens/Admin/Companies';
import { CompanyEdit, CompanyNew, CompanyShow } from '../Screens/Admin/Company';
import SessionHome from '../Screens/Session/SessionHome';
import SessionApplication from '../Screens/Session/SessionApplication';
import SessionApplications from '../Screens/Session/SessionApplications';
import SessionCompanies from '../Screens/Session/SessionCompanies';
import Login from '../Screens/Auth/Login';
import Logout from '../Screens/Auth/Logout';
import Signup from '../Screens/Auth/Signup';
import ForgotPassword from '../Screens/Auth/ForgotPassword';
import NotFound from '../Screens/NotFound';

import HtmlTitle from '../Components/HtmlTitle';
import { hasPermission } from '../Util/PermissionsHelper';
import Statistics from '../Screens/Admin/Statistics';

const { Header, Content, Footer } = Layout;

const privateRoutes = [
  { path: '/admin', component: AdminHome },
  { path: '/admin/categories', component: Categories },
  { path: '/admin/categories/:id', component: Category },
  { path: '/admin/companies', component: Companies },
  { path: '/admin/companies/new', component: CompanyNew },
  { path: '/admin/companies/:id', component: CompanyShow },
  { path: '/admin/companies/:id/edit', component: CompanyEdit },
  { path: '/admin/mailtemplates', component: Mailtemplates },
  { path: '/admin/mailtemplates/:id', component: Mailtemplate },
  { path: '/admin/deadlines', component: Deadlines },
  { path: '/admin/deadlines/:id', component: Deadline },
  { path: '/admin/users', component: Users },
  { path: '/admin/users/:id', component: UserShow },
  { path: '/admin/users/:id/edit', component: UserEdit },
  { path: '/admin/roles', component: Roles },
  { path: '/admin/roles/:id', component: RoleShow },
  { path: '/admin/roles/:id/edit', component: RoleEdit },
  { path: '/admin/statistics', component: Statistics },
  { path: '/session', component: SessionHome },
  { path: '/session/application', component: SessionApplication },
  { path: '/session/applications', component: SessionApplications },
  { path: '/session/companies', component: SessionCompanies }
];

const routes = (
  <Switch>
    <PrivateRoute exact path="/" component={Home} />
    <Route path="/info" component={Info} />
    {privateRoutes.map(props => (
      <PrivateRoute key={props.path} exact {...props} />
    ))}
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/signup" component={Signup} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/user" component={CurrentUser} />
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
          <Header className="app-header">
            <Link to="/" className="logo" />

            <Menu
              className="app-header-menu"
              theme="light"
              mode="horizontal"
              onClick={({ key }) => redirect(key)}
            >
              {this.restrictedSubMenu({
                route: 'admin',
                title: 'Admin',
                menus: [
                  this.restrictedMenuItem({
                    route: 'admin/companies',
                    title: 'Companies'
                  }),
                  this.restrictedMenuItem({
                    route: 'admin/categories',
                    title: 'Categories'
                  }),
                  this.restrictedMenuItem({
                    route: 'admin/roles',
                    title: 'Roles'
                  }),
                  this.restrictedMenuItem({
                    route: 'admin/users',
                    title: 'Users'
                  }),
                  this.restrictedMenuItem({
                    route: 'admin/mailtemplates',
                    title: 'Mailtemplates'
                  }),
                  this.restrictedMenuItem({
                    route: 'admin/deadlines',
                    title: 'Deadlines'
                  }),
                  this.restrictedMenuItem({
                    route: 'admin/statistics',
                    title: 'Statistics'
                  })
                ]
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
          <Content className="app-content">
            <Breadcrumb className="app-breadcrumb">
              <Breadcrumb.Item key="home">
                <Link to="/">Home</Link>
              </Breadcrumb.Item>
              {breadcrumbItems}
            </Breadcrumb>
            <Layout className="app-inner">
              <Content>{routes}</Content>
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
