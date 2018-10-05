/**
 * Login component
 * - A separe component is rendered in development, which allows login by only specifying email
 */

const Login =
  process.env.NODE_ENV === 'production'
    ? require('./ProductionLogin').default
    : require('./ProductionLogin').default;

export default Login;
