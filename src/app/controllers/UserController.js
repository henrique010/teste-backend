const User = require('../models/User');

module.exports = {

  async store(req, res) {
    const { ...data } = req.body;

    try {
      const user = await User.create(data);

      user.password = undefined;

      return res.json(user);
    }
    catch (error) {
      return res.status(400).json({ error });
    }
  }

}