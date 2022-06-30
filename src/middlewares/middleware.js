const Texto = require('../models/TextoModel');
const Section = require('../models/SectionModel');

exports.middlewareGlobal = async (req, res, next) => {
  const section = new Section(req.body)
  const sections = await section.showAll();
  const textos = await Texto.buscaTextos()
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  res.locals.texts = textos;
  res.locals.sections = sections;
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if(err) {
    return res.render('404');
  }

  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.loginRequired = (req, res, next) => {
  if(!req.session.user) {
    req.flash('errors', 'Você precisa fazer login.');
    req.session.save(() => res.redirect('/'));
    return;
  }

  next();
};
