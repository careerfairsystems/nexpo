import React, { Component } from 'react'
import URLHelper from '../../Util/URLHelper'
import InitialSignup from './InitialSignup'
import FinalizeSignup from './FinalizeSignup'

class Signup extends Component {
  render() {
    const key = URLHelper.getParameterByName("key")

    if(!key) {
      return <InitialSignup />
    }
    else {
      return <FinalizeSignup signupKey={key}/>
    }
  }
}

export default Signup
