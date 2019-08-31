const { Schema, model } = require('../../database');

const GitUserSchema = new Schema({
  login: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  html_url: {
    type: String,
    required: true
  },

  bio: String,

  location: String,

  tags: [String]
});

module.exports = model('GitUser', GitUserSchema);