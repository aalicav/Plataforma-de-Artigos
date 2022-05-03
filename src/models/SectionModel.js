const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  nameSection: { type: String, required: true, default: '' },
  id_article: { type: Array, required: true }
})

const SectionModel = mongoose.model('Sections', SectionSchema);

function Section(body) {
  this.nameSection = '';
  this.id_article = [];
  this.body = body;
  this.errors = [];
}

Section.prototype.register = async function () {
  if (this.errors.length > 0) return
  this.Section = await SectionModel.create(this.body)
}

Section.prototype.showAll = async function () {
  const Sections = SectionModel.find().sort({ criadoEm: -1 })
  return Sections
}

Section.prototype.edit = async function (id) {
  this.Section = await SectionModel.findByIdAndUpdate(id, this.body, { new: true })
}

Section.prototype.addID = async function (id, id1) {
  this.Section = await SectionModel.findByIdAndUpdate(id, {$push:{id_article:id1}}, { new: true })
}

Section.prototype.delete = async function (id) {
  const Section = await SectionModel.findOneAndDelete({ _id: id })
}

Section.prototype.show = async function (id) {
  if(!id) return 'Artigo não encontrado'
  const texto = await SectionModel.findById(id)
  return texto;
}

module.exports = Section;