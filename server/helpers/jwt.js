const jwt = require('jsonwebtoken')
const SECRET_KEY = 'farhad'

function generateToken(obj) {
  const token = jwt.sign(obj, SECRET_KEY)
  return token
}

function verifyToken(token) {
  const decoded = jwt.verify(token, SECRET_KEY)
  return decoded
}

module.exports = { generateToken, verifyToken }