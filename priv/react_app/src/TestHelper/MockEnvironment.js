/**
 * Provides functions that run functions in mock environments
 */

/**
 * Holds the environment that program was launched in
 */
const INITIAL_ENVIRONMENT = process.env.NODE_ENV;

/**
 * Sets the environment
 * @param {string} env
 */
function setEnvironment(env) {
  process.env.NODE_ENV = env;
}

/**
 * Runs a given function in a given environment
 * @param {string} env
 * @param {function} func
 */
function runInEnvironment(env, func) {
  setEnvironment(env);
  func();
  setEnvironment(INITIAL_ENVIRONMENT);
}

/**
 * Build the mocks
 */
export const mockEnvironment = {
  runInProduction: (func: *) => runInEnvironment('production', func),
  runInDevelopment: (func: *) => runInEnvironment('development', func),
  runInTest: (func: *) => runInEnvironment('test', func)
};
