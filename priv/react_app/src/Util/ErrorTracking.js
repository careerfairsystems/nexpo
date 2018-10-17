/**
 * Configures error tracking to Sentry
 */

// The Raven client is loaded in <head/> tag in index.html
const { Raven } = window;

const sentryDsn = process.env.REACT_APP_SENTRY_DSN;

// TODO: Config Sentry with user context when there is login functionality
const setupErrorTracking = () => Raven.config(sentryDsn).install();

export { setupErrorTracking };
