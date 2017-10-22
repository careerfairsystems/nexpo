import React, { Component } from 'react'
import URLHelper from '../../Util/URLHelper'
import InitialSignup from './InitialSignup'
import FinalizeSignup from './FinalizeSignup'
import HtmlTitle from '../../Components/HtmlTitle'

class Signup extends Component {
  render() {
    const key = URLHelper.getParameterByName("key")

    return (
      <div>
        <HtmlTitle title="Signup" />

        {!key ? <InitialSignup /> : <FinalizeSignup signupKey={key}/>}
      </div>
    )
  }
}

export default Signup
