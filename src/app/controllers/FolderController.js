const Folder = require('../models/Folder');
const User = require('../models/User');
const GitUser = require('../models/GitUser');

module.exports = {

  async show(req, res) {
    const id = req.params.idFolder;

    try {
      const folder = await Folder.findById(id).populate('gitusers');

      return res.json(folder);
    }
    catch (error) {
      return res.status(400).json({ error });
    }
  },
  async index(req, res) {
    const { idUser: _id } = req.params;

    try {
      const user = await User.findOne({ _id }).populate('folders');

      return res.json(user);
    }
    catch (error) {
      return res.status(400).json({ error });
    }

  },

  async store(req, res) {
    const { idUser: _id } = req.params;

    try {
      const user = await User.findOne({ _id }).populate('folders');

      const folder = await Folder.create(req.body);

      user.folders.push(folder);

      await user.save();

      return res.json(user);
    }
    catch (error) {
      return res.status(400).json({ error });
    }
  },

  async update(req, res) {
    const { idFolder } = req.params;
    const { id } = req.body;

    try {
      const folder = await Folder.findOne({ _id: idFolder });

      const gitUser = await GitUser.findById(id)

      folder.gitusers.push(gitUser);

      await folder.save();

      return res.json(folder);
    }
    catch (error) {
      return res.status(400).json({ error });
    }
  },

  async delete(req, res) {
    const { idFolder } = req.params;

    try {
      await Folder.findOneAndDelete({ _id: idFolder });

      return res.send();
    }
    catch (error) {
      return res.status(400).json({ error });
    }
  }
}