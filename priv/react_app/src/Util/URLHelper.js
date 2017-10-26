/**
 * A helper class for handling the url
 */

/**
 * Allows extraction of url parameters
 * @param {String} name
 * @param {String} url
 */
const getParameterByName = (name, url = window.location.href) => {
  name = name.replace(/[[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default {
  getParameterByName
}

