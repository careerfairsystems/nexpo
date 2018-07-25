/**
 * Configures error tracking to Sentry
 */

// The Raven client is loaded in <head/> tag in index.html
const Raven = window.Raven;

const sentry_dsn = process.env.REACT_APP_SENTRY_DSN;

// TODO: Config Sentry with user context when there is login functionality
const setupErrorTracking = () => Raven.config(sentry_dsn).install();

export { setupErrorTracking };
