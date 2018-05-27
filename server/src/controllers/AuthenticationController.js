const {User} = require('../models')

module.exports = {
  async register (req, res) {
    try {
      console.log(req.body)
      const user = await User.create(req.body)
      res.send(user.toJSON())
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },
  async login  (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(401).send({
          error: 'The login information was incorrect.'
        })
      }

      const isPasswdValid = password === user.password
      if (!isPasswdValid) {
        return res.status(401).send({
          error: 'The login information was incorrect.'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'An error has occured trying to log in.'
      })
    }
  }
}
