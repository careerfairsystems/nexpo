/**
 * Mocks response for fetch calls
 */

const defaultBody = {defaultBodyUsed: true}

export const mockHttpResponse = ({status, body = defaultBody}) => {
  // Build the response we want
  const response = new window.Response(JSON.stringify(body), {
    status: status,
    headers: {
      'Content-type': 'application/json'
    }
  })

  // Mock it
  window.fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve(response)
  })
}
