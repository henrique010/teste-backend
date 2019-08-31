const { Schema, model } = require('../../database');

const FolderSchema = new Schema({
  name: String,

  gitusers: [{
    type: Schema.Types.ObjectId,
    ref: 'GitUser',
  }]

});

module.exports = model('Folder', FolderSchema);