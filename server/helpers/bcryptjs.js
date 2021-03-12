const bcrypt = require('bcryptjs');

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10)
    const hashed = bcrypt.hashSync(password, salt)
    return hashed //hashed password
}

function comparePassword(password, hashed) {
    return bcrypt.compareSync(password, hashed); //true or false
}

module.exports = { hashPassword, comparePassword }