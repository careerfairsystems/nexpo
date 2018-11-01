/**
 * A helper class for handling the url
 */

/**
 * Allows extraction of url parameters
 * @param {String} queryName
 * @param {String} url
 */
export const getParameterByName = (
  queryName: string,
  url: string = window.location.href
) => {
  const name = queryName.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const toExternal = (url: ?string) => {
  if (!url) return url;
  if (url.match(/^[a-zA-Z]*:\/\/|^\/\//)) {
    return url;
  }
  return `//${url}`;
};

export default {
  getParameterByName,
  toExternal
};
