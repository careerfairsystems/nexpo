import { State } from 'jumpstate'

export default State({
  // Initial State
  initial: {
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
  },
})
