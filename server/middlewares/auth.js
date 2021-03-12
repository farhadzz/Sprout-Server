const { verifyToken } = require("../helpers/jwt");
const { getDatabase } = require('../config/mongodb')
const { ObjectId } = require('mongodb')

function authentication(req, res, next) {
  try {
    let decoded = verifyToken(req.headers.access_token)
    function user(id) {
      return getDatabase().collection('Users').findOne({ _id: ObjectId(id)})
    }

    let userLogin = user(decoded.id)

    if(!userLogin) {
      res.status(403).json({message: "No Authorization"})
    } else {
      req.user = userLogin
      next()
    }
    
  }
  catch(err) {
    res.status(500).json(err)
  }
}

module.exports = {
  authentication
}