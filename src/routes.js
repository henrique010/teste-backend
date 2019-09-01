//importção do express e de todos os controllers e mmiddlewares
const express = require('express');
const Middleware = require('./app/middlewares');
const TagController = require('./app/controllers/TagController');
const UserController = require('./app/controllers/UserController');
const FolderController = require('./app/controllers/FolderController');
const GitUserController = require('./app/controllers/GitUserController');
const AuthenticateController = require('./app/controllers/AuthenticateController');

const routes = express.Router();

//Rotas de registro e autenticação
routes.post('/authenticate',
  Middleware.validateAuthentication,
  AuthenticateController.authenticate);

routes.post('/register', Middleware.validateRegister, UserController.store);

//todas as rotas após o uso desse middleware necessitam de autenticação
routes.use(Middleware.isAuthenticate);

//Rotas de usuário ADMIN
routes.get('/users/:login', Middleware.isAdmin, GitUserController.show);
routes.post('/users', Middleware.isAdmin, GitUserController.store);

//Rotas de usuário COMUM
routes.get('/users', Middleware.isCommun, GitUserController.index);
routes.get('/folders/:idUser', Middleware.isCommun, FolderController.index);
routes.get('/folder/:idFolder', Middleware.isCommun, FolderController.show);

routes.post('/tags/:idFolder', Middleware.isCommun, TagController.store);
routes.post('/folders/:idUser', Middleware.isCommun, FolderController.store);

routes.put('/folders/:idFolder', Middleware.isCommun, FolderController.update);

routes.delete('/folders/:idFolder', Middleware.isCommun, FolderController.delete);

module.exports = routes;