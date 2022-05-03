const express = require('express');
const route = express.Router();
const multer = require('multer')

const multerConfig = require('./src/config/multer')
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const textoController = require('./src/controllers/textoController');
const sectionController = require('./src/controllers/sectionController')
const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', homeController.index);

// Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// Rotas de texto
route.get('/texto/index', loginRequired, textoController.index);
route.get('/texto/show/:id', textoController.show);
route.post('/texto/register', loginRequired, textoController.register);
route.get('/texto/index/:id', loginRequired, textoController.editIndex);
route.post('/texto/edit/:id', loginRequired, textoController.edit);
route.get('/texto/delete/:id', loginRequired, textoController.delete);

// Rotas do multer

route.post('/posts', multer().single('file'))

// Rotas da Section 

route.get('/section/showAll', sectionController.showAll)
route.post('/section/register', sectionController.create)
route.get('/section/delete/:id', sectionController.delete)
route.get('/section/add/:id', sectionController.showAll)
route.get('/section/addId/:id/:hash', sectionController.add)
route.get('/section/show/', sectionController.show)

module.exports = route;
