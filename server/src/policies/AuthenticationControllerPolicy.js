const Joi = require('Joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }

    const {error, value} = Joi.validate(req.body, schema)
    console.log('value' + value)
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: 'The password provided failed to match the following ruled: <br>  1. It must contain ONLY the following characters lowercase, uppercase or numbers. <br> 2. It must be at least 8 characters long and not greater than 32'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registeration infomation'
          })
      }
    } else {
      next()
    }
  }
}
