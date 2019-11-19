import React, { Component } from 'react';
// import type { Element } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Breadcrumb, Icon, Menu, Layout } from 'antd';
import { startCase } from 'lodash/fp';
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
import { RoleNew, RoleShow, RoleEdit } from '../Screens/Admin/Role';
import Users from '../Screens/Admin/Users';
import { UserShow, UserEdit } from '../Screens/Admin/User';
import Programmes from '../Screens/Admin/Programmes';
import Programme from '../Screens/Admin/Programme';
import Statistics from '../Screens/Admin/Statistics';
import CurrentUser from '../Screens/CurrentUser';
import Companies from '../Screens/Admin/Companies';
import StudentSessions from '../Screens/Admin/StudentSessions';
import { CompanyNew, CompanyEdit, CompanyShow } from '../Screens/Admin/Company';
import YourCompanyHome from '../Screens/YourCompany/YourCompanyHome';
import {
  YourCompanyProfileShow,
  YourCompanyProfileEdit
} from '../Screens/YourCompany/YourCompanyProfile';
import YourCompanyApplications from '../Screens/YourCompany/YourCompanyApplications';
import YourCompanyTimeSlots from '../Screens/YourCompany/YourCompanyTimeSlots';
import YourCompanyScans from '../Screens/YourCompany/YourCompanyScans';
import SessionHome from '../Screens/Session/SessionHome';
import SessionApplication from '../Screens/Session/SessionApplication';
import SessionApplications from '../Screens/Session/SessionApplications';
import SessionCompanies from '../Screens/Session/SessionCompanies';
import SessionsApproved from '../Screens/Session/SessionsApproved';
import Login from '../Screens/Auth/Login';
import Logout from '../Screens/Auth/Logout';
import Signup from '../Screens/Auth/Signup';
import ForgotPassword from '../Screens/Auth/ForgotPassword';
import NotFound from '../Screens/NotFound';
import PrivateRoute from '../Components/PrivateRoute';
import HtmlTitle from '../Components/HtmlTitle';
import { hasAccess, hasPermission } from '../Util/PermissionsHelper';

const { Header, Content, Footer } = Layout;

type RouteItem = {
  path: string,
  component: React$ComponentType<{}>
};

const privateRoutes: Array<RouteItem> = [
  { path: '/', component: Home },
  { path: '/admin', component: AdminHome },
  { path: '/admin/categories', component: Categories },
  { path: '/admin/categories/:id', component: Category },
  { path: '/admin/programmes', component: Programmes },
  { path: '/admin/programmes/new', component: Programme },
  { path: '/admin/programmes/:id', component: Programme },
  { path: '/admin/companies', component: Companies },
  { path: '/admin/sessions', component: StudentSessions },
  { path: '/admin/companies/new', component: CompanyNew },
  { path: '/admin/companies/:id', component: CompanyShow },
  { path: '/admin/companies/:id/edit', component: CompanyEdit },
  { path: '/admin/mailtemplates', component: Mailtemplates },
  { path: '/admin/mailtemplates/new', component: Mailtemplate },
  { path: '/admin/mailtemplates/:id', component: Mailtemplate },
  { path: '/admin/deadlines', component: Deadlines },
  { path: '/admin/deadlines/new', component: Deadline },
  { path: '/admin/deadlines/:id', component: Deadline },
  { path: '/admin/users', component: Users },
  { path: '/admin/users/:id', component: UserShow },
  { path: '/admin/users/:id/edit', component: UserEdit },
  { path: '/admin/roles', component: Roles },
  { path: '/admin/roles/new', component: RoleNew },
  { path: '/admin/roles/:id', component: RoleShow },
  { path: '/admin/roles/:id/edit', component: RoleEdit },
  { path: '/admin/statistics', component: Statistics },
  { path: '/user', component: CurrentUser },
  { path: '/logout', component: Logout },
  { path: '/session', component: SessionHome },
  { path: '/session/application', component: SessionApplication },
  { path: '/session/applications', component: SessionApplications },
  { path: '/session/companies', component: SessionCompanies },
  { path: '/session/approved', component: SessionsApproved },
  { path: '/company', component: YourCompanyHome },
  { path: '/company/profile', component: YourCompanyProfileShow },
  { path: '/company/profile/edit', component: YourCompanyProfileEdit },
  { path: '/company/applications', component: YourCompanyApplications },
  { path: '/company/timeslots', component: YourCompanyTimeSlots },
  { path: '/company/scans', component: YourCompanyScans }
];

const routes = (
  <Switch>
    <Route path="/info" component={Info} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/forgot-password" component={ForgotPassword} />
    {privateRoutes.map((props: RouteItem) => (
      <PrivateRoute key={props.path} exact {...props} />
    ))}
    <Route component={NotFound} />
  </Switch>
);

type Props = {
  isLoggedIn: boolean,
  currentUser?: {
    email?: ?string,
    firstName?: ?string,
    lastName?: ?string,
    roles?: Array<{ type: string, permissions: Array<string> }>
  },
  logout: () => void,
  redirect: string => void,
  pathname: string
};

/**
 * The base of the application. Defines the basic layout
 */
class App extends Component<Props> {
  static defaultProps = {
    currentUser: {}
  };

  loggedInMenuItem = () => {
    const { currentUser = {} } = this.props;
    const { email, firstName, lastName } = currentUser;

    const displayName: ?string = firstName
      ? [firstName, lastName].join(' ')
      : email;

    return [
      <Menu.Item key="/user">
        {displayName} <Icon type="user" />
      </Menu.Item>,
      <Menu.Item key="/logout">Logout</Menu.Item>
    ];
  };

  loggedOutMenuItem = () => [
    <Menu.Item key="/login">Login</Menu.Item>,
    <Menu.Item key="/signup">Sign Up</Menu.Item>
  ];

  restrictedSubMenu = ({
    route,
    title,
    menus,
    ...rest
  }: {
    route: string,
    title: string,
    menus: Array<?React$Element<any>>
  }) => {
    const { currentUser: user, isLoggedIn, redirect } = this.props;
    if (isLoggedIn && hasPermission(user, route) && hasAccess(user, route)) {
      return (
        <Menu.SubMenu
          title={title}
          key={`/${route}`}
          onTitleClick={() => redirect(`/${route}`)}
          {...rest}
        >
          {menus}
        </Menu.SubMenu>
      );
    }
    return null;
  };

  restrictedMenuItem = ({
    route,
    title,
    ...rest
  }: {
    route: string,
    title: string,
    disabled?: boolean
  }) => {
    const { currentUser: user, isLoggedIn } = this.props;
    if (isLoggedIn && hasPermission(user, route) && hasAccess(user, route)) {
      return (
        <Menu.Item key={`/${route}`} {...rest}>
          {title}
        </Menu.Item>
      );
    }
    return null;
  };

  render() {
    const { isLoggedIn, redirect, pathname } = this.props;
    const paths: Array<string> = pathname.split('/').filter((i: string) => i);
    const breadcrumbItems: Array<React$Element<any>> = paths.map(
      (item: string, index: number) => {
        const url: string = `/${paths.slice(0, index + 1).join('/')}`;
        return (
          <Breadcrumb.Item key={url}>
            <Link to={url}>{startCase(item)}</Link>
          </Breadcrumb.Item>
        );
      }
    );

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
                    route: 'admin/sessions',
                    title: 'Student Session'
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
                    route: 'admin/programmes',
                    title: 'Programmes'
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
                    title: 'Apply',
                    disabled: true // STUDENT_SESSIONS_ACTIVE
                  }),
                  this.restrictedMenuItem({
                    route: 'session/applications',
                    title: 'View Applications'
                  }),
                  this.restrictedMenuItem({
                    route: 'session/companies',
                    title: 'View Companies'
                  }),
                  this.restrictedMenuItem({
                    route: 'session/approved',
                    title: 'View Approved Applications'
                  })
                ]
              })}
              {this.restrictedSubMenu({
                route: 'company',
                title: 'Your Company',
                menus: [
                  this.restrictedMenuItem({
                    route: 'company/profile',
                    title: 'Company Profile'
                  }),
                  this.restrictedMenuItem({
                    route: 'company/applications',
                    title: 'Applications'
                  }),
                  this.restrictedMenuItem({
                    route: 'company/timeslots',
                    title: 'Time Slots'
                  }),
                  this.restrictedMenuItem({
                    route: 'company/scans',
                    title: 'Student Scans'
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

export default App;
