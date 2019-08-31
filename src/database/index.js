const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://projects:projects@cluster0-uxlnd.mongodb.net/teste-backend?retryWrites=true&w=majority',
  {
    useNewUrlParser: true
  });

mongoose.Promise = global.Promise;

module.exports = mongoose;