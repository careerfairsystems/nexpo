import React, { Component } from 'react'

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import InvisibleLink from './Components/InvisibleLink'

import Companies from './Components/Companies'
import Company from './Components/Company'
import NotFound from './Components/NotFound'

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

  closeDrawer = () => this.setState({drawerOpen: false})

  render() {
    return (
      <div>
        <AppBar
          title="Nexpo"
          onLeftIconButtonTouchTap={() => this.setState({drawerOpen: true})}
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
          <Route path="/companies/:id" component={Company} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App
