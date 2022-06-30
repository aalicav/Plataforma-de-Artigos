const Texto = require('../models/TextoModel');
exports.index = async(req, res) => {
  const textos = await Texto.buscaTextos();
  res.render('index', { textos});
};

