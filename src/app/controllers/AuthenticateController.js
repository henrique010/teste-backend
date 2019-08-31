const User = require('../models/User');
const utils = require('../utils');
const bcryptjs = require('bcryptjs');

module.exports = {

  async authenticate(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email }).select('+password');

      if (!user)
        return res.status(404).json({ message: 'User not found' });

      if (!await bcryptjs.compare(password, user.password))
        return res.status(400).json({ message: 'Incorret password' });

      user.password = undefined;

      return res.json({ user, token: utils.generateToken({ role: user.role }) });
    }
    catch (error) {
      return res.status(400).json({ error });
    }
  }
}