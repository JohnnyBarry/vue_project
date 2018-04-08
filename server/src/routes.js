const AuthenticactionController = require('./controllers/AuthenticationController')

const AuthenticactionControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  app.post('/register',
    AuthenticactionControllerPolicy.register,
    AuthenticactionController.register)
}
