/**
 * Defines a reducer for handling the data retrieved from backend
 */

let initialState = {
  companies: []
}

// Used for testing purposes
initialState = {
  companies: [
    {
      "id": 1,
      "name": "Spotify",
      "email": "info@spotify.se"
    },
    {
      "id": 2,
      "name": "Tetra Pak",
      "email": "info@tetrapak.se"
    },
    {
      "id": 3,
      "name": "Axis",
      "email": "info@axis.se"
    },
  ]
}

const data = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state
  }
}

export default data
