const jwt = require('jsonwebtoken');
const secret = require('../../config/auth.json');
const utils = require('../utils/index');

module.exports = {
  isAdmin(req, res, next) {
    if (req.role !== 'ADMIN')
      return res.status(401).json({ message: 'Without permission' })

    return next();
  },

  isCommun(req, res, next) {
    if (req.role !== 'COMUM')
      return res.status(401).json({ message: 'Without permission' })

    return next();
  },

  validateAuthentication(req, res, next) {
    const { email, password } = req.body;

    if (!utils.IsEmail(email))
      return res.status(400).json({ message: 'Email invalid' });

    if (password.length < 6)
      return res.status(400).json({ message: 'Password is short' });

    return next();
  },

  validateRegister(req, res, next) {
    const { ...user } = req.body;

    if (!utils.IsEmail(user.email))
      return res.status(400).json({ message: 'Email invalid' });

    if (user.password.length < 6)
      return res.status(400).json({ message: 'Password is short' });

    if (user.cpf.length !== 11)
      return res.status(400).json({ message: 'Cpf invalid' });

    if (user.role !== 'COMUM' && user.role !== 'ADMIN')
      return res.status(400).json({ message: 'Role invalid' });

    return next();
  },

  isAuthenticate(req, res, next) {
    const authToken = req.headers.authorization;

    if (!authToken)
      return res.status(401).json({ message: 'Token not provided' });

    const parts = authToken.split(' ');

    if (!parts.length === 2)
      return res.status(401).json({ message: 'Error in token' });

    const [schema, token] = parts;

    if (!/^Bearer$/i.test(schema))
      return res.status(401).json({ message: 'Baddly formatted token' });

    jwt.verify(token, secret.key, (error, decoded) => {
      if (error)
        return res.status(401).json({ message: 'Invalid token' });

      req.role = decoded.role;

      return next();
    });
  }
}