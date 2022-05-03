const Section = require('../models/SectionModel');
const Texto = require('../models/TextoModel');

exports.showAll = async (req, res) => {
  const section = new Section(req.body);
  const secoes = await section.showAll()
  if (req.params.id) {
    res.render('sections', {
      Section: {},
      Sections: secoes,
      id: req.params.id,
    })
  } else {
    res.render('sections', {
      Section: {},
      Sections: secoes,
      id: false,
    })
  }
}

exports.create = async (req, res) => {
  try {
    const section = new Section(req.body);
    await section.register()

    if (section.errors.length > 0) {
      req.flash('errors', 'Sua seção não pôde ser cadastrada')
      req.session.save(() => res.redirect('back'))
      return
    }
    req.flash('success', 'Seção registrada com sucesso')
    req.session.save(() => res.redirect('/'));
  } catch (e) {
    console.log(e)
    return res.render('404')
  }
}

exports.add = async (req, res) => {
  const idSection = await req.params.id;
  const idText = await req.params.hash;
  const section = new Section(req.body)
  section.addID(idSection, idText)
  req.flash('success', "Texto adicionado a esta seção")
  req.session.save(() => res.redirect('back'))
}

exports.delete = async (req, res) => {
  const id = req.params.id;
  const section = new Section(req.body);
  const delSection = section.delete(id);
  if (!delSection) return res.render('404')
  req.flash('success', 'Seção apagada com sucesso');
  req.session.save(() => res.redirect('back'));
  return
}

exports.show = async (req, res) => {
  const texto = async (id) => 
  {
    const textos = await Texto.buscaPorId(id)
    return textos
  };
  const section = new Section(req.body);
  const secoes = await section.showAll()
  let arr = []
  for(let ind in secoes){
    for (id of secoes[ind].id_article){
      const textos = await texto(id)
      if(textos) arr.push(textos)
    }
  }
 console.log(arr)
  res.render('section-articles', {
    Sections:secoes,
    titulos: arr,
  })
}