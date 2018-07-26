/**
 * This file helps keep track of the jwt for the signed in user
 */

/**
 * Holds the JWT of the currently signed in user
 */
let JWT_TOKEN: string = '';

/**
 * Sets the current JWT
 */
export const setJwt = (jwt: string) => {
  try {
    // Store token in localStorage so it can be retrieved later
    localStorage.setItem('JWT_TOKEN', jwt);
  } catch (error) {
    // Incognito mode in safari seems to have issues with localStorage.
    // Therefore, put the JWT in this temporary variable
    JWT_TOKEN = jwt;
  }
};

/**
 * Gets the current JWT
 */
export const getJwt = (): string =>
  localStorage.getItem('JWT_TOKEN') || JWT_TOKEN;

export const deleteJwt = () => {
  localStorage.removeItem('JWT_TOKEN');
  JWT_TOKEN = '';
};
