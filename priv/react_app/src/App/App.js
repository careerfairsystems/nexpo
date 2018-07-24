import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle'

import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import PrivateRoute from '../Components/PrivateRoute'

import Companies from '../Screens/Companies'
import Company from '../Screens/Company'
import NotFound from '../Screens/NotFound'
import Login from '../Screens/Login'
import Signup from '../Screens/Signup'
import ForgotPassword from '../Screens/ForgotPassword'

import InvisibleLink from '../Components/InvisibleLink'
import HtmlTitle from '../Components/HtmlTitle'

/**
 * The base of the application. Defines the basic layout
 */
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      drawerOpen: false,
    }
  }

  loggedInAppBar = () => {
    const {currentUser, logout} = this.props
    const nameOfUser = `${currentUser.first_name  } ${  currentUser.last_name}`
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        targetOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disabled primaryText={nameOfUser} rightIcon={<ActionAccountCircle />}/>
        <Divider />
        <MenuItem primaryText='Logout' onClick={logout}/>
      </IconMenu>

    )
  }

  loggedOutAppBar = () => {
    const {history} = this.props
    return <FlatButton label='Login' onClick={() => history.push('login')} />
  }

  closeDrawer = () => this.setState({drawerOpen: false})

  render() {
    const {isLoggedIn} = this.props
    return (
      <div>
        {/* Always fall back to default htmltitle if screen does not specify its own */}
        <HtmlTitle />

        <AppBar
          title="Nexpo"
          onLeftIconButtonTouchTap={() => this.setState({drawerOpen: true})}
          iconElementRight={isLoggedIn ? this.loggedInAppBar() : this.loggedOutAppBar()}
         />

        <Drawer
          open={this.state.drawerOpen}
          docked={false}
          onRequestChange={open => this.setState({drawerOpen: open})}
        >
          <Subheader>Navigation</Subheader>
          <InvisibleLink to="/companies">
            <MenuItem onClick={this.closeDrawer}>Companies</MenuItem>
          </InvisibleLink>
        </Drawer>

        <Switch>
          <Route exact path="/" render={() => <Redirect to="/companies" />} />
          <Route exact path="/companies" component={Companies} />
          <PrivateRoute path="/companies/:id" component={Company} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

export default App
