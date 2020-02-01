const bcrypt = require('bcrypt')
const jwtUtil = require('../../utils/jwt')

const getSessionData = (req, res) => {
  return new Promise((resolve, reject) => {
    const user = {
      id: 1,
      name: 'Fulano',
      email: 'fulano@gmail.com'
    }

    resolve(user)
  })
}

const login = (req, res) => {
  return new Promise((resolve, reject) => {
    const user = {
      id: 1,
      name: 'Fulano',
      email: 'fulano@gmail.com',
      password: bcrypt.hash('123456', 10)
    }

    delete user.password

    jwtUtil.generateAuthToken(user).then(response => {
      user.token = response
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

module.exports = {
  login,
  getSessionData
}
