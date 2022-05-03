const mongoose = require('mongoose');
const validator = require('validator');

const TextoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  subtitulo: { type: String, required: false, default: '' },
  corpo: { type: String, required: false, default: '' },
});

const TextoModel = mongoose.model('Texto', TextoSchema);

function Texto(body) {
  this.body = body;
  this.errors = [];
  this.texto = null;
}

Texto.prototype.valida = function() {

  Texto.prototype.cleanUp = function() {
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
  
    this.body = {
      titulo: this.body.titulo,
      subtitulo: this.body.subtitulo,
      corpo: this.body.corpo,
    };
  };
  
  this.cleanUp();

  // Validação
  // O e-mail precisa ser válido
  if(!this.body.titulo) this.errors.push('O campo Titulo é obrigatório');
  if(!this.body.corpo) this.errors.push('O texto é um campo obrigatório.');
  }

Texto.prototype.register = async function() {
  this.valida();
  if(this.errors.length > 0) return;
  this.Texto = await TextoModel.create(this.body);
}


Texto.prototype.edit = async function (id) {
  if(typeof id !== 'string') return;
  this.valida();
  if(this.errors.length > 0) return;
  this.Texto = await TextoModel.findByIdAndUpdate(id, this.body, { new: true });
};

// Métodos estáticos
Texto.buscaPorId = async function(id) {
  if(typeof id !== 'string') return;
  const Texto = await TextoModel.findById(id);
  return Texto;
};

Texto.buscaTextos = async function() {
  const Textos = await TextoModel.find()
    .sort({ criadoEm: -1 });
  return Textos;
};

Texto.delete = async function(id) {
  if(typeof id !== 'string') return;
  const Texto = await TextoModel.findOneAndDelete({_id: id});
  return Texto;
};


module.exports = Texto;
