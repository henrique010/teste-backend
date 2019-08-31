const Folder = require('../models/Folder');

module.exports = {

  async store(req, res) {
    const { idFolder } = req.params;
    const { id, tag } = req.body;

    try {
      const folder = await Folder.findOne({ _id: idFolder }).populate('gitusers');

      const index = folder.gitusers.findIndex(user => user.id === id);

      folder.gitusers[index].tags.push(tag);

      await folder.gitusers[index].save();

      return res.json(folder);
    }
    catch (error) {
      return res.status(400).json({ error });
    }
  }
}