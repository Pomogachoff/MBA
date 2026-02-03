let indicatorSchema = new mongoose.Schema({
  indicatorFullName: String,
  indicatorShortName: String,
  indicatorDescription: String,
  indicatorFormulaJS: String
});
module.exports = mongoose.model('indicator', indicatorSchema);