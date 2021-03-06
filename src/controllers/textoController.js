const Texto = require('../models/TextoModel');
const Section = require('../models/SectionModel');

exports.index = (req, res) => {
  res.render('texto', {
    texto:{}
  });
};

exports.show = async (req, res) => {
  const  id  = req.params.id;
  const textos = await Texto.buscaPorId(id)
  const section = new Section(req.body);
  const secoes = await section.showAll()
  let nomeSecao = '';
  for(let ind in secoes){
    for (id_text of secoes[ind].id_article){
      if(id == id_text){
        nomeSecao = secoes[ind].nameSection;
        break
      }
    }
  }
  res.render('texto-completo',{textos, nomeSecao})
}

exports.register = async (req, res) => {
  try {
    const texto = new Texto(req.body);
    await texto.register();

    if (texto.errors.length > 0) {
      req.flash('errors', texto.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'texto registrado com sucesso.');
    req.session.save(() => res.redirect(`/`));
    return;
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};

exports.editIndex = async function (req, res) {
  if (!req.params.id) return res.render('404');

  const texto = await Texto.buscaPorId(req.params.id);
  if (!texto) return res.render('404');

  res.render('texto', { texto });
};

exports.edit = async function (req, res) {
  try {
    if (!req.params.id) return res.render('404');
    const texto = new Texto(req.body);
    await texto.edit(req.params.id);

    if (texto.errors.length > 0) {
      req.flash('errors', texto.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'texto editado com sucesso.');
    req.session.save(() => res.redirect('back'));
    return;
  } catch (e) {
    console.log(e);
    res.render('404');
  }
};

exports.delete = async function (req, res) {
  if (!req.params.id) return res.render('404');

  const texto = await Texto.delete(req.params.id);
  if (!texto) return res.render('404');

  req.flash('success', 'texto apagado com sucesso.');
  req.session.save(() => res.redirect('back'));
  return;
};
