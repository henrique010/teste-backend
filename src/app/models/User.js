const { Schema, model } = require('../../database');
const bcryptjs = require('bcryptjs');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  cpf: {
    type: Number,
    required: true
  },

  role: {
    type: String,
    required: true
  },

  folders: [{
    type: Schema.Types.ObjectId,
    ref: 'Folder'
  }]
});

UserSchema.pre('save', async function (next) {
  if (this.password) {
    const hash = await bcryptjs.hash(this.password, 10);

    this.password = hash;
  }

  return next();
});

module.exports = model('User', UserSchema);