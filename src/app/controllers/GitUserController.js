const GitUser = require('../models/GitUser');
const Folder = require('../models/Folder');
const axios = require('axios');

module.exports = {

  async show(req, res) {
    const { login } = req.params;

    try {
      const response = await axios.get(`https://api.github.com/users/${login}`);

      const { name, location, bio, html_url } = response.data;

      return res.json({ login, name, location, bio, html_url });
    }
    catch (error) {
      return res.status(400).json({ error });
    }
  },

  async index(req, res) {
    try {
      const users = await GitUser.find({});

      return res.json(users);
    }
    catch (error) {
      return res.status(400).json({ error });
    }
  },

  async store(req, res) {
    const { ...user } = req.body;

    try {
      const gitUser = await GitUser.create(user);

      return res.json(gitUser);
    }
    catch (error) {
      return res.status(400).json({ error });
    }
  },

  async update(req, res) {
    const { idFolder } = req.params;
    const { user } = req.headers;

    try {
      const folder = await Folder.findOne({ _id: idFolder });

      const gitUser = await GitUser.findById(user)

      folder.gitusers.push(gitUser);

      await folder.save();

      return res.json(folder);
    }
    catch (error) {
      return res.status(400).json({ error });
    }
  }
}