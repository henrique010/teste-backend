const jwt = require('jsonwebtoken');
const secret = require('../../config/auth.json');

module.exports = {
  generateToken(params = {}) {
    return jwt.sign(params, secret.key, {
      expiresIn: 86400
    });
  },

  IsEmail(email) {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    return emailRegexp.test(email);
  }
}