const { secretKey } = require('../config')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  if (req.method === 'OPTION') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      res.status(401).json({message: 'Нет авторизации'})
    }

    req.user = jwt.verify(token, secretKey)
    next()

  } catch (e) {
    res.status(401).json({message: 'Нет авторизации'})
  }
}