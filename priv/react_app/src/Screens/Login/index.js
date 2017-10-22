/**
 * Separates production login from development login
 */

const Login = process.env.NODE_ENV === 'production'
? require('./ProductionLogin').default
: require('./DevelopmentLogin').default

export default Login
