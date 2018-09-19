import React, { Component } from 'react';

const hostString =
  "If you are a host, don't forget to upload you resumes under you profile and apply for student sessions.";

class Startscreen extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to Nexpo!</h1>

        <h3>{hostString}</h3>
      </div>
    );
  }
}

export default Startscreen;
