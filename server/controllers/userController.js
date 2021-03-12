const { hashPassword, comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')
const UserModel = require('../models/users')

class UserController {

  static async findUserHandler(req, res) {
    try {
      const user = await UserModel.findAll()
      res.status(200).json(user)
    }
    catch(err) {

      res.status(500).json(err)
    }
  }

  static async findOneUserHandler(req, res) {
    try {
      const user = await UserModel.findEmail(req.params.email)
      if(!user) {
        res.status(404).json({ message: 'Not Found' })
      } else {
        res.status(200).json(user)
      }
    }
    catch(err) {
      res.status(500).json(err)
    }
  }

  static async registerHandler(req, res) {
    try {
      const { name, phone_number, email, password, password2 } = req.body
      const obj = {
        name,
        phone_number,
        email,
        password: hashPassword(password)
      }

      if(password !== password2) {
        res.status(403).json({ message: "Password didn't match" })
      } else if(!name) {
        res.status(403).json({ message: "Name is required" })
      } else if(typeof phone_number !== 'number') {
        res.status(403).json({ message: "Input must be number" })
      } else if(!email) {
        res.status(403).json({ message: "Email is required" })
      } else {
        const user = await UserModel.findEmail(email)
        if(user) {
          res.status(403).json({ message: "Email already registered" })
        } else {
          if(password === password2) {
            const newUser = await UserModel.register(obj)
            res.status(201).json(newUser.ops)
          } else {
            res.status(403).json({message: "Password didn't match" })
          }
        }
      }

    }
    catch(err) {
      res.status(500).json(err)
    }
  }

  static async loginHandler(req, res) {
    try {
      const { email, password } = req.body

      let user = await UserModel.findEmail(email)
      
      if(!user) {
        res.status(401).json({message: "Invalid email/password"})
      }
      let matchPassword = comparePassword(password, user.password)
      
      if(!matchPassword) {
        res.status(401).json({message: "Invalid email/password"})
      }

      if(user && matchPassword) {

        let payload = {
          id: user._id,
          email: user.email
        }
        const access_token = generateToken(payload)

        res.status(200).json({
          access_token,
          email: user.email,
          name: user.name
        })
      }
    }
    catch(err) {
      res.status(500).json(err)
    }
  }

  static async deleteUserHandler(req, res) {
    try {
      const user = await UserModel.delete(req.params.id)
      if(user.result.n === 1) {
        res.status(200).json({ message: "Delete Success" })
      } else {
        res.status(404).json({ message: 'Not Found' })
      }
    }
    catch(err) {
      res.status(500).json(err)
    }
  }
}

module.exports = UserController