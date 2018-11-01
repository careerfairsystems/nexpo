/**
 * Mocks response for fetch calls
 */

const defaultBody = { defaultBodyUsed: true };

export const mockHttpResponse = ({
  status,
  body = defaultBody
}: {
  status: number,
  body?: any
}) => {
  // Build the response we want
  const response = new window.Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-type': 'application/json'
    }
  });

  // Mock it
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve(response));
};
