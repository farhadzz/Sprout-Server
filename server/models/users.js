const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')

class UserModel {

  static register(user) {
    return getDatabase().collection('Users').insertOne(user)
  }

  static findAll() {
    return getDatabase().collection('Users').find().toArray()
  }

  static findEmail(email) {
    return getDatabase().collection('Users').findOne({ email })
  }

  static findOne(id) {
    return getDatabase().collection('Users').findOne({ _id: ObjectId(id)})
  }

  static delete(id) {
    return getDatabase().collection('Users').deleteOne({ _id: ObjectId(id)})
  }
}

module.exports = UserModel